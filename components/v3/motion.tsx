"use client";
/**
 * JWV3-FINAL-2 MOTION primitives. Native APIs only (IntersectionObserver,
 * matchMedia, visibilitychange); transform-only motion; nothing hides content
 * that is already visible, and reduced motion leaves everything static.
 */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One shared observer: fires when an element's top crosses 88% of the viewport. */
const callbacks = new Map<Element, () => void>();
let io: IntersectionObserver | null = null;
function onEnter(el: Element, cb: () => void) {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { const f = callbacks.get(e.target); if (f) { callbacks.delete(e.target); io!.unobserve(e.target); f(); } } }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
  }
  callbacks.set(el, cb);
  io.observe(el);
  return () => { callbacks.delete(el); io?.unobserve(el); };
}

const reducedQuery = () => matchMedia("(prefers-reduced-motion: reduce)");
/** Live reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = reducedQuery();
    const f = () => setReduced(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return reduced;
}
/** Already on screen (or above it) at mount: never arm an entrance for it. */
const visibleNow = (el: Element) => el.getBoundingClientRect().top < innerHeight * 0.88;

/** Section/block rise: 16px → 0 over 600ms, once. */
export function Rise({ children, className = "", delay = 0, as: Tag = "div", attrs }: { children: ReactNode; className?: string; delay?: number; as?: ElementType; attrs?: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");
  const reduced = useReducedMotion();
  useIso(() => {
    const el = ref.current;
    if (!el || reducedQuery().matches || visibleNow(el)) return;
    setState("armed");
    const off = onEnter(el, () => setState("in"));
    const focus = () => { off(); setState("idle"); }; // never move focused content
    el.addEventListener("focusin", focus);
    return () => { off(); el.removeEventListener("focusin", focus); };
  }, []);
  useEffect(() => { if (reduced) setState("idle"); }, [reduced]);
  return (
    <Tag ref={ref} {...attrs} className={`v3-rise ${className}`} data-rise={state} style={delay ? ({ "--rise-delay": `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

/** Split-line heading reveal for below-hero headings. One semantic heading; wrappers released after the reveal. */
export function RevealHeading({ as: Tag = "h2", text, className = "", id }: { as?: "h2" | "h3"; text: string; className?: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<"plain" | "measure" | "armed" | "in">("plain");
  const [lines, setLines] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const words = text.split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedQuery().matches || visibleNow(el)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current || visibleNow(ref.current)) return;
      setPhase("measure");
    });
    return () => { cancelled = true; };
  }, []);

  useIso(() => {
    if (phase !== "measure" || !ref.current) return;
    const spans = [...ref.current.querySelectorAll<HTMLElement>("[data-w]")];
    const out: string[] = [];
    let top = -1;
    spans.forEach((s) => {
      const w = (s.textContent ?? "").trim();
      if (!out.length || Math.abs(s.offsetTop - top) > 2) { out.push(w); top = s.offsetTop; } else out[out.length - 1] += " " + w;
    });
    // Never arm without measured lines: an empty heading must not be possible.
    if (!out.length || out.join(" ") !== words.join(" ")) { setPhase("plain"); return; }
    setLines(out);
    setPhase("armed");
  }, [phase]);

  useEffect(() => {
    if (phase !== "armed" || !ref.current) return;
    const el = ref.current;
    const off = onEnter(el, () => {
      setPhase("in");
      window.setTimeout(() => setPhase("plain"), 600 + Math.min(180, 60 * lines.length) + 50);
    });
    const resize = () => setPhase("measure");
    window.addEventListener("resize", resize);
    return () => { off(); window.removeEventListener("resize", resize); };
  }, [phase, lines.length]);

  useEffect(() => { if (reduced) setPhase("plain"); }, [reduced]);

  let content: ReactNode = text;
  if (phase === "measure") content = words.map((w, i) => <span key={i} data-w={i}>{(i ? " " : "") + w}</span>);
  if ((phase === "armed" || phase === "in") && lines.length)
    content = lines.map((l, i) => (
      <span key={i} className="v3-line">
        <span className="v3-line-in" style={{ "--i": i } as CSSProperties}>{(i ? " " : "") + l}</span>
      </span>
    ));
  return (
    <Tag ref={ref} id={id} className={className} data-reveal={phase}>
      {content}
    </Tag>
  );
}

/** Image cover reveal: a section-coloured cover slides out of a stationary clipping frame (700ms). */
export function RevealCover() {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");
  useIso(() => {
    const frame = ref.current?.parentElement;
    if (!frame || reducedQuery().matches || visibleNow(frame)) return;
    setState("armed");
    return onEnter(frame, () => setState("in"));
  }, []);
  return <span ref={ref} aria-hidden="true" className="v3-cover" data-cover={state} />;
}

/** Magnetic primary CTA: inner visual layer only, max 3px, fine pointer only. */
export function MagneticPill({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const pill = ref.current;
    const target = pill?.parentElement;
    if (!pill || !target) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let raf = 0, x = 0, y = 0;
    const reset = () => { cancelAnimationFrame(raf); pill.style.transition = "transform 240ms cubic-bezier(.2,.8,.2,1)"; pill.style.transform = ""; };
    const move = (e: PointerEvent) => {
      if (!fine.matches || reducedQuery().matches || e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        const dx = Math.max(-3, Math.min(3, ((x - (r.left + r.width / 2)) / (r.width / 2)) * 3));
        const dy = Math.max(-3, Math.min(3, ((y - (r.top + r.height / 2)) / (r.height / 2)) * 3));
        pill.style.transition = "transform 180ms cubic-bezier(.2,.8,.2,1)";
        pill.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerleave", reset);
    target.addEventListener("blur", reset);
    target.addEventListener("keydown", reset);
    return () => { reset(); target.removeEventListener("pointermove", move); target.removeEventListener("pointerleave", reset); target.removeEventListener("blur", reset); target.removeEventListener("keydown", reset); };
  }, []);
  return (
    <span ref={ref} className="v3-btn">
      {children}
    </span>
  );
}

/** Still-image Ken Burns layer: runs only while on screen and the tab is visible; static under reduced motion. */
export function KenBurns({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let vis = false;
    const update = () => setRun(vis && !document.hidden);
    const obs = new IntersectionObserver(([e]) => { vis = e.isIntersecting; update(); }, { threshold: 0 });
    obs.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { obs.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <div ref={ref} className={`v3-kb ${className}`} data-kb={run ? "run" : "paused"}>
      {children}
    </div>
  );
}

/** Stacked FEATURE: records where the text block ends so the faint still tapers to 0 before the media. */
export function FeatureFit() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".v3-feature");
    const text = section?.querySelector<HTMLElement>(".v3-feature-text");
    if (!section || !text) return;
    const ro = new ResizeObserver(() => {
      const end = text.getBoundingClientRect().bottom - section.getBoundingClientRect().top;
      section.style.setProperty("--feat-text-end", `${Math.round(end)}px`);
    });
    ro.observe(section);
    ro.observe(text);
    return () => ro.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}

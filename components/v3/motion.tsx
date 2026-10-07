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
/** Resolves once, shortly after the window load event: secondary imagery waits for it (LCP first). */
let loaded: Promise<void> | null = null;
const whenLoaded = () =>
  (loaded ??= new Promise<void>((r) => {
    const go = () => window.setTimeout(r, 200);
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  }));
export function useAfterLoad() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let live = true;
    whenLoaded().then(() => live && setOk(true));
    return () => { live = false; };
  }, []);
  return ok;
}
/** Below-fold/secondary image: not requested until after load. `ratio` reserves its box meanwhile (no shift). */
export function Deferred({ children, ratio }: { children: ReactNode; ratio?: string }) {
  const ok = useAfterLoad();
  if (ok) return <>{children}</>;
  return ratio ? <span data-deferred="pending" style={{ display: "block", aspectRatio: ratio }} /> : <span data-deferred="pending" hidden />;
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

/**
 * JWV3-FINAL-3 NO-SHIFT-REVEAL: stable semantic heading. The text tree is never
 * rewritten (no line splitting); only the whole heading translates 12px → 0 once,
 * opacity stays 1. Visible at mount → never armed. Reduced motion/no-JS → static.
 * Focus entering the heading cancels the motion.
 */
export function RevealHeading({ as: Tag = "h2", text, className = "", id }: { as?: "h2" | "h3"; text: string; className?: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<"plain" | "armed" | "in">("plain");
  const reduced = useReducedMotion();
  useIso(() => {
    const el = ref.current;
    if (!el || reducedQuery().matches || visibleNow(el)) return;
    setPhase("armed");
    let timer = 0;
    const off = onEnter(el, () => { setPhase("in"); timer = window.setTimeout(() => setPhase("plain"), 650); });
    const focus = () => { off(); window.clearTimeout(timer); setPhase("plain"); };
    el.addEventListener("focusin", focus);
    return () => { off(); window.clearTimeout(timer); el.removeEventListener("focusin", focus); };
  }, []);
  useEffect(() => { if (reduced) setPhase("plain"); }, [reduced]);
  return (
    <Tag ref={ref} id={id} className={className} data-reveal={phase}>
      {text}
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


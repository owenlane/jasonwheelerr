"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { rgb, type Align, type CineFrame } from "@/lib/v3";

/** Approved timing: each frame holds 8 s, then a 2 s eased dissolve. */
export const HOLD_MS = 8000;
export const FADE_MS = 2000;

const ease = (p: number) => (1 - Math.cos(Math.PI * p)) / 2;


/**
 * A photo section. Frames are decorative backgrounds (alt="") with their own
 * overlay; text stays stationary and only opacity animates. During a dissolve
 * the outgoing frame stays fully opaque underneath and the incoming frame
 * fades in above it, so every intermediate state is a blend of two fully
 * treated frames. Motion is suspended offscreen and while the tab is hidden
 * (no catch-up), and replaced by the first frame for reduced motion.
 * JWV3-FINAL-2 R19: no manual pause control.
 */
export default function CinematicSection({
  frames,
  hue,
  align = "C",
  priority = false,
  className = "",
  children,
}: {
  frames: CineFrame[];
  hue: string;
  align?: Align;
  priority?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const ready = useRef(new Set<number>());
  const clock = useRef({ index: 0, elapsed: 0 });
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const multi = frames.length > 1;

  const paint = useCallback(() => {
    const { index, elapsed } = clock.current;
    const next = (index + 1) % frames.length;
    const p = elapsed > HOLD_MS ? ease(Math.min(1, (elapsed - HOLD_MS) / FADE_MS)) : 0;
    layers.current.forEach((el, i) => {
      if (!el) return;
      const on = i === index ? 1 : i === next && p > 0 ? p : 0;
      el.style.opacity = String(on);
      el.style.zIndex = i === next && p > 0 ? "2" : i === index ? "1" : "0";
    });
    const el = root.current;
    if (el) {
      el.dataset.frame = String(index);
      el.dataset.dissolve = p > 0 ? p.toFixed(3) : "0";
    }
  }, [frames.length]);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);
    const onVis = () => setTabVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (root.current) io.observe(root.current);
    layers.current.forEach((el, i) => {
      const img = el?.querySelector("img");
      if (img?.complete && img.naturalWidth) ready.current.add(i);
    });
    return () => {
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      clock.current = { index: 0, elapsed: 0 };
      paint();
    }
  }, [reduced, paint]);

  const running = multi && !reduced && visible && tabVisible;
  useEffect(() => {
    if (root.current) root.current.dataset.running = running ? "true" : "false";
  }, [running]);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const c = clock.current;
      const next = (c.index + 1) % frames.length;
      if (c.elapsed < HOLD_MS || ready.current.has(next)) c.elapsed += dt;
      else c.elapsed = HOLD_MS; // hold until the next frame has loaded
      if (c.elapsed >= HOLD_MS + FADE_MS) clock.current = { index: next, elapsed: 0 };
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, frames.length, paint]);

  const style = { "--v3-hue": rgb(hue), "--v3-bg": hue, "--v3-fg": "#FFFFFF", "--v3-btn-label": hue } as CSSProperties;

  return (
    <section
      ref={root}
      className={`v3 v3-sec v3-photo v3-align-${align} ${className}`}
      style={style}
      data-frame="0"
      data-dissolve="0"
      data-running="false"
    >
      <div className="v3-bg" aria-hidden="true">
        <div className="v3-frames">
          {frames.map((f, i) => (
            <div
              key={f.key}
              ref={(el) => {
                layers.current[i] = el;
              }}
              className="v3-frame"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0, "--o-a": f.a, "--o-b": f.b } as CSSProperties}
            >
              <picture>
                <source type="image/avif" srcSet={f.avif} sizes="100vw" />
                <source type="image/webp" srcSet={f.webp} sizes="100vw" />
                <img
                  src={f.fallback}
                  alt=""
                  width={1920}
                  height={1080}
                  loading={i === 0 && priority ? "eager" : "lazy"}
                  fetchPriority={i === 0 && priority ? "high" : "auto"}
                  decoding="async"
                  onLoad={() => ready.current.add(i)}
                  style={{ objectPosition: f.focal, transform: f.scale ? `scale(${f.scale})` : undefined, transformOrigin: f.focal }}
                />
              </picture>
              <div className="v3-overlay" />
            </div>
          ))}
        </div>
        <div className="v3-edge" />
      </div>
      <div className="v3-content">{children}</div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CinematicVideo } from "./VideoPlayer";
import { Rise } from "./v3/motion";
import { byFilter, propertyFilters, type PropertyCategory, type Video } from "@/lib/youtube";
import { person } from "@/lib/site";

const PAGE = 6;

/**
 * The property-video collection. Filters apply to property content only —
 * lifestyle uploads can never surface here, including as "Latest".
 */
export default function VideoLibrary({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<PropertyCategory | "latest">("latest");
  const [shown, setShown] = useState(PAGE);
  // FINAL-4: after "Show more", focus moves to the first new card's player button (announced by its name).
  const gridRef = useRef<HTMLDivElement>(null);
  const focusFrom = useRef<number | null>(null);
  useEffect(() => {
    const i = focusFrom.current;
    if (i === null) return;
    focusFrom.current = null;
    gridRef.current?.children[i]?.querySelector<HTMLElement>("button, a[href]")?.focus();
  }, [shown]);

  const available = useMemo(
    () => propertyFilters.filter((f) => f.id === "latest" || byFilter(videos, f.id).length > 0),
    [videos],
  );
  const list = useMemo(() => byFilter(videos, active), [videos, active]);

  if (byFilter(videos, "latest").length === 0) {
    return (
      <div data-video-empty className="mt-10 border border-accent p-8">
        <p className="measure text-[0.9375rem] leading-relaxed quiet">
          The library is loading from YouTube. Everything is on the channel itself.
        </p>
        <a
          data-video-ctrl
          href={person.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center border border-ink px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-field"
        >
          Open the channel
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Filter property videos" className="flex flex-wrap gap-x-7 gap-y-3 border-t border-ink pt-4">
        {available.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={active === f.id}
            onClick={() => {
              setActive(f.id);
              setShown(PAGE);
            }}
            className={`min-h-11 font-display text-[0.625rem] uppercase tracking-[0.18em] transition-colors ${
              active === f.id ? "text-ink" : "text-support hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {list.length} videos shown.
      </p>

      <div ref={gridRef} className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {list.slice(0, shown).map((v, i) => (
          <Rise key={v.id} delay={Math.min(180, (i % 3) * 60)}>
            <CinematicVideo video={v} />
          </Rise>
        ))}
      </div>

      {shown < list.length && (
        <button
          data-video-ctrl
          type="button"
          onClick={() => { focusFrom.current = shown; setShown((n) => n + PAGE); }}
          className="mt-12 inline-flex min-h-12 items-center border border-ink px-7 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-field"
        >
          Show more
        </button>
      )}
    </div>
  );
}

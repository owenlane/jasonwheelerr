"use client";

import { useState } from "react";
import { formatDate, type Video } from "@/lib/youtube";
import { videoTitles } from "@/lib/video-titles";

/**
 * Facade player. The YouTube iframe is only mounted after the visitor clicks,
 * so foreground playback is strictly user-initiated and nothing autoplays or
 * blocks the page. No iframe cost on first load.
 */
export function CinematicVideo({ video, priority = false }: { video: Video; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const title = videoTitles[video.id] ?? video.title;

  return (
    <figure className="group photo-palette video-card" data-palette={/kitchen|interior|cabinets/i.test(video.title) ? "interior" : "valley"}>
      <div className="relative aspect-video w-full overflow-hidden bg-media">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt=""
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-media/75 via-media/10 to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="play-mark flex h-11 w-11 items-center justify-center">
                <svg viewBox="0 0 12 14" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                  <path d="M0 0v14l12-7z" />
                </svg>
              </span>
              <span className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-white">Play</span>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <h3 className="text-[0.9375rem] font-semibold leading-snug">{title}</h3>
        <span className="microlabel shrink-0">{formatDate(video.published)}</span>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block text-sm">Watch on YouTube<span className="sr-only"> (opens in a new tab)</span></a>
      </figcaption>
    </figure>
  );
}

/**
 * Hero facade player. Fills its parent box at whatever size the layout gives it
 * — the hero image is not resized. Same click-to-play behaviour as the video
 * library: a still thumbnail with a Play control until the visitor clicks, at
 * which point the YouTube iframe mounts. Nothing autoplays and no iframe loads
 * in the first viewport until the visitor asks for it.
 */
export function HeroVideo({ video, label }: { video: Video; label?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative h-full w-full overflow-hidden bg-media">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full cursor-pointer text-left"
          aria-label={`Play video: ${video.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={`Still from a property walkthrough: ${video.title}`}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-media/80 via-media/10 to-transparent" />
          {/* Centre play affordance — glass, hover-reactive. */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center border border-field/70 bg-media/30 backdrop-blur-[3px] transition-all duration-300 group-hover:scale-110 group-hover:border-field group-hover:bg-field/90">
              <svg viewBox="0 0 12 14" aria-hidden="true" className="ml-0.5 h-5 w-5 fill-field transition-colors group-hover:fill-media">
                <path d="M0 0v14l12-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-5 left-5 right-5">
            {label && <span className="microlabel text-accent">{label}</span>}
            <span className="mt-2 block text-[0.9375rem] font-medium text-field">{video.title}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoGrid({ videos, priorityFirst = false }: { videos: Video[]; priorityFirst?: boolean }) {
  return (
    <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
      {videos.map((v, i) => (
        <CinematicVideo key={v.id} video={v} priority={priorityFirst && i === 0} />
      ))}
    </div>
  );
}

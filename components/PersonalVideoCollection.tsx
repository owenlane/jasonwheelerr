"use client";

/**
 * PersonalVideoCollection — R5
 *
 * The shared ten-video collection, rendered on BOTH /about and /videos. Both
 * pages import this same component and the same data source, so the two
 * destinations cannot drift. Linking from About to Videos would not have
 * satisfied the requirement.
 *
 * Behaviour:
 *  - Click to load. Ten simultaneous iframes are never mounted; each card
 *    holds a thumbnail and a descriptive play button until activated. That is
 *    also the privacy-aware embed path — youtube-nocookie is only contacted
 *    after a deliberate click.
 *  - `initialCount` cards render first, with an explicit labelled expansion.
 *    Not an ambiguous gesture.
 *  - Every card carries a direct "Watch on YouTube" link, so a video whose
 *    embedding is restricted still has a truthful working path.
 *  - A failed embed keeps its identity and shows the fallback rather than
 *    silently disappearing.
 */

import { useState } from "react";
import { personalVideos, type PersonalVideo } from "@/lib/personal-videos";

function VideoCard({ video }: { video: PersonalVideo }) {
  const [loaded, setLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);

  return (
    <li className="photo-palette video-card" data-palette={video.id==="P01"?"gym":["P03","P04"].includes(video.id)?"water":["P02","P06","P07"].includes(video.id)?"interior":"valley"}>
      <div className="relative aspect-video bg-black">
        {loaded && !embedFailed ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            onError={() => setEmbedFailed(true)}
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Play the video: ${video.displayTitle}`}
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center bg-[rgba(10,18,26,0.45)] text-4xl text-white transition-colors group-hover:bg-[rgba(10,18,26,0.3)]"
            >
              ▶
            </span>
          </button>
        )}
      </div>

      <div className="personal-caption">
        <h3 className="font-display text-[1rem] font-semibold">{video.displayTitle}</h3>

        {embedFailed && (
          <p className="mt-2 text-[0.875rem] quiet">
            This one won&rsquo;t play here. It&rsquo;s still on YouTube.
          </p>
        )}

        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mt-3 inline-block text-[0.875rem]"
        >
          Watch {video.displayTitle} on YouTube
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}

export default function PersonalVideoCollection({
  initialCount = 4,
  headingId = "personal-videos",
}: {
  initialCount?: number;
  headingId?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? personalVideos : personalVideos.slice(0, initialCount);

  return (
    <div aria-labelledby={headingId}>
      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <VideoCard key={v.youtubeId} video={v} />
        ))}
      </ul>

      {personalVideos.length > initialCount && (
        <button
          type="button"
          className="btn btn-secondary mt-8"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Show fewer" : `Show all ${personalVideos.length}`}
        </button>
      )}
    </div>
  );
}

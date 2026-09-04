import { person } from "@/lib/site";

/** Honest state when the YouTube feed is unreachable. Never invents content. */
export default function VideoEmpty({ tone = "field" }: { tone?: "field" | "media" }) {
  return (
    <div className={`mt-10 border p-8 ${tone === "media" ? "border-white/20" : "border-accent"}`}>
      <p className={`measure text-[0.9375rem] leading-relaxed ${tone === "media" ? "text-field/70" : "quiet"}`}>
        The video list is loading from YouTube. Everything is on the channel itself.
      </p>
      <a
        href={person.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex min-h-11 items-center px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
          tone === "media" ? "border border-field/40 text-field" : "border border-ink text-ink hover:bg-ink hover:text-field"
        }`}
      >
        Open the channel
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

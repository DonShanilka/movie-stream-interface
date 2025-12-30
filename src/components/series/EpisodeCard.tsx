'use client';

interface Episode {
  ID: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Title: string;
  Episode: string;
}

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="flex items-center justify-between bg-neutral-800 p-2 rounded hover:bg-neutral-700 transition">
      <span className="text-sm">
        S{episode.SeasonNumber}E{episode.EpisodeNumber} – {episode.Title}
      </span>

      <a
        href={episode.Episode}
        target="_blank"
        rel="noreferrer"
        className="text-yellow-400 text-sm font-semibold hover:underline"
      >
        ▶ Play
      </a>
    </div>
  );
}

import { Play } from 'lucide-react';

export default function EpisodeCard({
  episode,
  onPlay,
}: {
  episode: any;
  onPlay: (url: string) => void;
}) {
  return (
    <div
      onClick={() => onPlay(episode.Episode)}
      className="group relative flex justify-between items-center bg-neutral-800 p-4 rounded-xl hover:bg-neutral-700 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 overflow-hidden"
    >
      <div className="flex items-center gap-4 relative z-10 w-full truncate pr-4">
        {/* Episode Number */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 shadow-inner text-lg font-bold text-gray-200">
          {episode.EpisodeNumber || "-"}
        </div>

        {/* Title and Metadata */}
        <div className="flex flex-col truncate">
          <span className="text-base font-medium text-gray-200 group-hover:text-white transition-colors truncate">
            {episode.Title || "Episode Title"}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">
            Season {episode.SeasonNumber || 1} • Episode {episode.EpisodeNumber || 1}
          </span>
        </div>
      </div>

      {/* Play Button */}
      <button
        className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 group-hover:bg-black text-yellow-400 hover:text-yellow-300 transition-all shadow"
      >
        <Play className="w-5 h-5 fill-current ml-0.5" />
      </button>
    </div>
  );
}

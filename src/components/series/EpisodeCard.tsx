export default function EpisodeCard({
  episode,
  onPlay,
}: {
  episode: any;
  onPlay: (url: string) => void;
}) {
  return (
    <div className="flex justify-between items-center bg-neutral-800 p-3 rounded hover:bg-neutral-700 transition">
      <span className="text-sm font-medium text-gray-200">
        {episode.Title}
      </span>
      <button
        onClick={() => onPlay(episode.Episode)}
        className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm transition"
      >
        Play
      </button>
    </div>
  );
}

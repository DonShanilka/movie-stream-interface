export default function EpisodeCard({ episode }: any) {
  return (
    <div className="flex justify-between bg-neutral-800 p-3 rounded hover:bg-neutral-700">
      <span>
        {episode.EpisodeNumber}. {episode.Title}
      </span>
      <a href={episode.Episode} target="_blank" className="text-yellow-400">
        Play
      </a>
    </div>
  );
}

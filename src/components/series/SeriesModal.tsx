'use client';

import { useMemo, useState } from 'react';
import EpisodeCard from './EpisodeCard';
import { X } from 'lucide-react';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
}

interface Episode {
  ID: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Title: string;
  Episode: string;
}

export default function SeriesModal({
  series,
  episodes,
  loading,
  onClose,
}: {
  series: TVSeries;
  episodes?: Episode[];
  loading: boolean;
  onClose: () => void;
}) {
  const [season, setSeason] = useState(1);

  const seasons = useMemo(() => {
    if (!episodes) return [];
    return [...new Set(episodes.map((e) => e.SeasonNumber))];
  }, [episodes]);

  const filteredEpisodes = useMemo(
    () => episodes?.filter((e) => e.SeasonNumber === season),
    [episodes, season]
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-start"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 w-full max-w-4xl rounded-xl mt-10 overflow-hidden"
      >
        {/* Banner */}
        <div className="relative h-72">
          <img
            src={`data:image/png;base64,${series.Banner}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 p-2 rounded-full"
          >
            <X />
          </button>

          <h1 className="absolute bottom-6 left-6 text-3xl font-bold">
            {series.Title}
          </h1>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-4">{series.Description}</p>

          {/* Season selector */}
          {seasons.length > 0 && (
            <select
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="bg-neutral-800 px-3 py-2 rounded mb-4"
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  Season {s}
                </option>
              ))}
            </select>
          )}

          {loading && <p>Loading episodes…</p>}

          <div className="space-y-3">
            {filteredEpisodes?.map((ep) => (
              <EpisodeCard key={ep.ID} episode={ep} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import EpisodeCard from './EpisodeCard';
import { X } from 'lucide-react';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Thumbnail: string;
}

interface Episode {
  ID: number;
  SeriesID: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Title: string;
  Episode: string;
}

interface Props {
  series: TVSeries;
  episodes?: Episode[];
  loading: boolean;
  onClose: () => void;
}

export default function SeriesModal({
  series,
  episodes,
  loading,
  onClose,
}: Props) {
  const [season, setSeason] = useState(1);

  const seasons = useMemo(() => {
    if (!episodes) return [];
    return [...new Set(episodes.map((e) => e.SeasonNumber))];
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    return episodes?.filter((e) => e.SeasonNumber === season);
  }, [episodes, season]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-start overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 w-full max-w-4xl rounded-xl overflow-hidden mt-10"
      >
        {/* BANNER */}
        <div className="relative h-72">
          <img
            src={`data:image/png;base64,${series.Thumbnail}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 p-2 rounded-full"
          >
            <X className="text-white" />
          </button>

          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl font-bold">{series.Title}</h1>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-6">
          <p className="text-gray-300 mb-4">{series.Description}</p>

          {/* SEASON SELECT */}
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

          {/* EPISODES */}
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

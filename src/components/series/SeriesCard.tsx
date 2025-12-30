'use client';

import { useMemo, useState } from 'react';
import EpisodeCard from './EpisodeCard';

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
  onLoadEpisodes: (seriesID: number) => void;
}

export default function SeriesCard({
  series,
  episodes,
  loading,
  onLoadEpisodes,
}: Props) {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  // 🔹 Get unique seasons from episodes
  const seasons = useMemo(() => {
    if (!episodes) return [];
    return Array.from(
      new Set(episodes.map((ep) => ep.SeasonNumber))
    ).sort((a, b) => a - b);
  }, [episodes]);

  // 🔹 Filter episodes by season
  const filteredEpisodes = useMemo(() => {
    return episodes?.filter((ep) => ep.SeasonNumber === selectedSeason);
  }, [episodes, selectedSeason]);

  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden transform transition hover:scale-105">
      {/* Thumbnail */}
      <img
        src={`data:image/png;base64,${series.Thumbnail}`}
        alt={series.Title}
        className="w-full h-48 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition" />

      <div className="relative p-4">
        <h2 className="text-lg font-bold">{series.Title}</h2>

        <p className="text-xs text-gray-300 line-clamp-2 mb-3">
          {series.Description}
        </p>

        {/* Load Episodes Button */}
        <button
          onClick={() => onLoadEpisodes(series.ID)}
          className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-500"
        >
          {loading ? 'Loading…' : 'Episodes'}
        </button>

        {/* Season Selector */}
        {episodes && seasons.length > 0 && (
          <div className="mt-3">
            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(Number(e.target.value));
                console.log(seasons.length);
              }}
              className="w-full bg-neutral-800 text-white text-sm px-2 py-1 rounded"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  Season {season}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Episodes List */}
        {filteredEpisodes && (
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
            {filteredEpisodes.map((ep) => (
              <EpisodeCard key={ep.ID} episode={ep} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

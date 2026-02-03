'use client';

import { useMemo, useState } from 'react';
import EpisodeCard from './EpisodeCard';
import { X, Play } from 'lucide-react';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
  ReleaseYear: number;
  Language: string;
  SeasonCount: number;
  Country: string;
  AgeRating: string;
  Rating: number;
  Genre: string;
  Trailer?: string; // base64 video
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
  const [showTrailer, setShowTrailer] = useState(false);

  // Get all seasons from episodes
  const seasons = useMemo(() => {
    if (!episodes) return [];
    return [...new Set(episodes.map((e) => e.SeasonNumber))];
  }, [episodes]);

  // Filter episodes by selected season
  const filteredEpisodes = useMemo(
    () => episodes?.filter((e) => e.SeasonNumber === season),
    [episodes, season]
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 w-full max-w-3xl rounded-2xl mt-12 overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105"
      >
        {/* Banner Section */}
        <div className="relative h-96">
          <img
            src={`data:image/png;base64,${series.Banner}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

          {/* Trailer Button */}
          {series.Trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute top-82 right-8 bg-yellow-400 hover:bg-yellow-500 transition-colors px-4 py-2 rounded-full text-black font-semibold shadow-lg flex items-center gap-2"
            >
              <Play className="w-5 h-5" /> Trailer
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 hover:bg-orange-600 transition-colors p-3 rounded-full text-white shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {series.Title}
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Series Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="space-y-1">
              <p>
                <span className="text-white font-semibold">Release Year:</span>{' '}
                {series.ReleaseYear}
              </p>
              <p>
                <span className="text-white font-semibold">Language:</span>{' '}
                {series.Language}
              </p>
              <p>
                <span className="text-white font-semibold">Seasons:</span>{' '}
                {series.SeasonCount}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="text-white font-semibold">Country:</span>{' '}
                {series.Country}
              </p>
              <p>
                <span className="text-white font-semibold">Age Rating:</span>{' '}
                {series.AgeRating}
              </p>
              <p>
                <span className="text-white font-semibold">Rating:</span>{' '}
                {series.Rating.toFixed(1)}
              </p>
              <p>
                <span className="text-white font-semibold">Genre:</span>{' '}
                {series.Genre}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            {series.Description}
          </p>

          {/* Season Selector */}
          {seasons.length > 0 && (
            <div>
              <label className="text-gray-400 mb-2 block font-medium">
                Select Season:
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500 transition w-full md:w-1/2"
              >
                {seasons.map((s) => (
                  <option key={s} value={s}>
                    Season {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <p className="text-gray-400 italic">Loading episodes…</p>
          )}

          {/* Episodes List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEpisodes?.map((ep) => (
              <EpisodeCard key={ep.ID} episode={ep} />
            ))}
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && series.Trailer && (
          <div
            className="fixed inset-0 z-60 bg-black/90 flex justify-center items-center p-4"
            onClick={() => setShowTrailer(false)}
          >
            <div className="w-full max-w-4xl aspect-video relative">
              <video
                src={`data:video/mp4;base64,${series.Trailer}`}
                controls
                autoPlay
                className="w-full h-full rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-orange-600 p-3 rounded-full text-white shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

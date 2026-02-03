'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface TVSeries {
  ID: number;
  Title: string;
  Thumbnail: string;
  Banner: string;
}

export default function SeriesCard({
  series,
  onClick,
}: {
  series: TVSeries;
  onClick: () => void;
}) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(series.ID)) {
      removeFavorite(series.ID);
    } else {
      addFavorite({ id: series.ID, type: 'series', data: series });
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer bg-neutral-900 rounded-lg overflow-hidden hover:scale-105 transition"
    >
      <img
        src={`data:image/png;base64,${series.Banner}`}
        alt={series.Title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={handleFavoriteClick}
          className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
        >
          <Heart className={`w-5 h-5 ${isFavorite(series.ID) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
      </div>
      <div className="p-3">
        <h2 className="text-sm font-bold">{series.Title}</h2>
      </div>
    </div>
  );
}

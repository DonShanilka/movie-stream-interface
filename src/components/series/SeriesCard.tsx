'use client';

import { useState } from 'react';
import { Heart, Play, Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
  Thumbnail: string;
  ReleaseYear: number;
  Language: string;
  SeasonCount: number;
  Country: string;
  AgeRating: string;
  Rating: number;
  Genre: string;
}

interface Props {
  series: TVSeries;
  onClick: () => void;
}

export default function SeriesCard({ series, onClick }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);

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
      className="relative z-0 hover:z-50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SERIES CARD WRAPPER */}
      <div
        className={`relative cursor-pointer transition-all duration-500 ease-out rounded-xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${isHovered ? 'scale-110 -translate-y-4' : 'scale-100 translate-y-0'
          }`}
        onClick={onClick}
      >
        <img
          src={`data:image/png;base64,${series.Banner}`}
          alt={series.Title}
          className="h-72 w-full object-cover transition-transform duration-700"
        />

        {/* HOVER OVERLAY: GLASSMORPHIC INFO PANEL */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* TOP ACTIONS */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleFavoriteClick}
              className="p-2 bg-black/60 rounded-full hover:bg-red-600 transition-colors group/fav"
            >
              <Heart
                className={`w-5 h-5 transition-all ${isFavorite(series.ID) ? 'fill-red-500 text-red-500 scale-110' : 'text-white group-hover/fav:scale-110'
                  }`}
              />
            </button>
          </div>

          {/* PLAY BUTTON CENTER */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`flex items-center justify-center p-4 bg-yellow-400 rounded-full shadow-2xl transition-all duration-500 delay-100 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}>
              <Play className="w-6 h-6 text-black fill-current ml-0.5" />
            </div>
          </div>

          {/* BOTTOM METADATA */}
          <div className={`space-y-2 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <h3 className="text-lg font-black text-white leading-tight truncate">
              {series.Title}
            </h3>

            <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-gray-300 flex-wrap">
              <span className="text-yellow-400 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {series.Rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{series.ReleaseYear}</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 border border-white/30 rounded text-xs uppercase">
                {series.AgeRating}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
              <span className="truncate max-w-[120px]">{series.Genre}</span>
              <span>•</span>
              <span>{series.SeasonCount} Seasons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

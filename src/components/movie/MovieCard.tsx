'use client';

import { Play } from 'lucide-react';

interface Props {
  movie: any;
  onPlay: (url: string) => void;
}

export default function MovieCard({ movie, onPlay }: Props) {
  // Backend proxy streaming URL
  const streamUrl = `http://localhost:8080/api/movies/getAllMovies?movie=${encodeURIComponent(
    movie.MovieURL
  )}`;

  return (
    <div className="relative group cursor-pointer">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={`data:image/png;base64,${movie.Thumbnail}`}
          alt={movie.Title}
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
        
        {/* Play Button */}
        <button
          onClick={() => onPlay(streamUrl)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-semibold w-fit hover:bg-gray-200"
        >
          <Play className="w-5 h-5 fill-black" />
          Play
        </button>

        {/* Movie Info */}
        <h3 className="mt-3 text-lg font-bold">{movie.Title}</h3>
        <p className="text-sm text-gray-300">
          {movie.ReleaseYear} • {movie.Genre}
        </p>
      </div>
    </div>
  );
}

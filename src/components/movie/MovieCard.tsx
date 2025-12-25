'use client';

import { Play } from 'lucide-react';

interface Props {
  movie: any;
  onPlay: (url: string) => void;
}

export default function MovieCard({ movie, onPlay }: Props) {
  return (
    <div className="group w-60 cursor-pointer">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={`data:image/png;base64,${movie.Thumbnail}`}
          alt={movie.Title}
          className="h-80 w-full object-cover transition-transform group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <button
            onClick={() => onPlay(movie.MovieURL)}
            className="bg-yellow-400 p-4 rounded-full text-black hover:scale-110 transition"
          >
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>

      <h3 className="mt-2 font-semibold text-white">{movie.Title}</h3>
      <p className="text-sm text-gray-400">
        {movie.ReleaseYear} • {movie.Genre}
      </p>
    </div>
  );
}

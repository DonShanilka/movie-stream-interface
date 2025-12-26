'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import VideoModal from '@/components/movie/VideoModal';

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/movies/getAllMovies')
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div className="px-12 py-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      <div className="grid grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.Id}
            movie={movie}
            onPlay={(url) => {
              setSelectedMovie(url);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {open && (
        <VideoModal
          movieUrl={selectedMovie}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import VideoModal from '@/components/movie/VideoModal';

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [playUrl, setPlayUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/movies/getAllMovies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="px-12 py-10 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.Id}
            movie={movie}
            onPlay={(url) => setPlayUrl(url)}
          />
        ))}
      </div>

      {playUrl && (
        <VideoModal
          url={playUrl}
          onClose={() => setPlayUrl(null)}
        />
      )}
    </div>
  );
}

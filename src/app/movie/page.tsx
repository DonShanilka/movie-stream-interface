'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import VideoModal from '@/components/movie/VideoModal';
import Navbar from '@/components/layout/Navbar';
import GenreBar from '@/components/UI/GenreBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/movies/getAllMovies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);

        // Extract unique genres
        const uniqueGenres = Array.from(new Set(data.map((m: any) => m.Genre))).filter(Boolean) as string[];
        setGenres(uniqueGenres);
      });
  }, []);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => movie.Genre === selectedGenre));
    }
  }, [selectedGenre, movies]);

  return (
    <div>
      <Navbar />
      <div className="px-12 py-24 bg-black min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>

        <GenreBar
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.Id}
              movie={movie}
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No movies found in this genre.
          </div>
        )}
      </div>
    </div>
  );
}

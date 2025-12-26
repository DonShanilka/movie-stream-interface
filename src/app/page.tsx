'use client';

import { Play, Plus, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

/* ================= HERO MOVIES ================= */
const featuredMovies = [
  {
    id: 1,
    title: 'Avatar',
    genre: 'Sci-Fi / Adventure',
    year: 2009,
    duration: '162 min',
    rating: 8.2,
    image:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    title: 'Avatar: The Way of Water',
    genre: 'Sci-Fi / Action',
    year: 2022,
    duration: '192 min',
    rating: 7.9,
    image:
      'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1920&q=80',
  },
];

/* ================= MOVIE GRID (50 ITEMS) ================= */
const movieImages = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4',
  'https://images.unsplash.com/photo-1517602302552-471fe67acf66',
  'https://images.unsplash.com/photo-1535016120720-40c646be5580',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
  'https://images.unsplash.com/photo-1522120692535-7c3abb882bc2',
  'https://images.unsplash.com/photo-1608178398319-48f814d0750c',
  'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0',
  'https://images.unsplash.com/photo-1574267432644-f610c36e6a9f',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b',
  'https://images.unsplash.com/photo-1559582798-678dfc71ccd8',
];

const movies = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  rating: (Math.random() * 2 + 7).toFixed(1),
  image: `${movieImages[i % movieImages.length]}?auto=format&fit=crop&w=400&q=80`,
}));

/* ================= PAGE ================= */
export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      {featuredMovies.map((movie) => (
        <div key={movie.id} className="relative h-[85vh] pt-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${movie.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative h-full flex items-center px-12">
            <div className="max-w-2xl">
              <p className="text-yellow-400 mb-3 text-sm">{movie.genre}</p>

              <h1 className="text-6xl font-black mb-4 leading-tight">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  {movie.rating}
                </span>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>

                <button className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg hover:bg-white/30 transition">
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ================= MOVIE GRID ================= */}
      <section className="px-12 py-16">
        <h2 className="text-3xl font-bold mb-8">Trending Movies</h2>

        <div className="grid grid-cols-10 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={movie.image}
                  alt={movie.title}
                  loading="lazy"
                  className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition rounded-lg p-3 flex flex-col justify-end">
                <h4 className="text-sm font-semibold mb-1">
                  {movie.title}
                </h4>

                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    {movie.rating}
                  </span>

                  <Play className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        body {
          background-color: #000;
        }
      `}</style>
    </div>
  );
}

'use client';

import { Play, Plus, Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
    'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/682ccc891f4663001daf980d.jpg',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
];

/* ================= MOVIE GRID ================= */
const movieImages = [
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4',
  'https://images.unsplash.com/photo-1517602302552-471fe67acf66',
  'https://images.unsplash.com/photo-1535016120720-40c646be5580',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
];

const movies = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  rating: (Math.random() * 2 + 7).toFixed(1),
  image: `${movieImages[i % movieImages.length]}?auto=format&fit=crop&w=400&q=80`,
  video:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
}));

/* ================= PAGE ================= */
export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  /* ESC KEY CLOSE */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* ================= HERO ================= */}
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

              <h1 className="text-6xl font-black mb-4">{movie.title}</h1>

              <div className="flex gap-4 text-sm text-gray-300 mb-6">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  {movie.rating}
                </span>
              </div>

              <button
                onClick={() => openModal(movie)}
                className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ================= MOVIE GRID ================= */}
      <section className="px-12 py-16">
        <h2 className="text-3xl font-bold mb-8">Trending Movies</h2>

        <div className="grid grid-cols-10 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => openModal(movie)}
              className="group relative cursor-pointer"
            >
              <img
                src={movie.image}
                className="h-60 w-full rounded-lg object-cover"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-end p-3">
                <div className="flex justify-between w-full">
                  <span className="text-sm">{movie.title}</span>
                  <Play className="text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {open && selectedMovie && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[70%] bg-black rounded-xl overflow-hidden animate-scaleIn"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/70 p-2 rounded-full"
            >
              <X />
            </button>

            <video
              controls
              autoPlay
              className="w-full h-[75vh] object-cover"
            >
              <source src={selectedMovie.video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ================= ANIMATIONS ================= */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease;
        }
      `}</style>
    </div>
  );
}

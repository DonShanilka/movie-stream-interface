"use client";

import { Play, Plus, Star, X } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";

/* ================= HERO MOVIES ================= */
const featuredMovies = [
  {
    id: 1,
    title: "Jurassic World Rebith",
    genre: "Sci-Fi / Adventure",
    discription:
      "Five years post-Jurassic World: Dominion (2022), an expedition braves isolated equatorial regions to extract DNA from three massive prehistoric creatures for a groundbreaking medical breakthrough.",
    year: 2025,
    duration: "200 min",
    rating: 8.2,
    image:
      "https://4kwallpapers.com/images/wallpapers/jurassic-world-3840x2160-22719.jpg",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

/* ================= MOVIE GRID ================= */
const movieImages = [
  "https://images.herzindagi.info/her-zindagi-english/images/2025/06/13/article/image/How-to-Train-Your-Dragon-2025-Trivia-5-Fun-Facts-About-The-Film-1749804963493.webp",
  "https://m.media-amazon.com/images/M/MV5BYjQxYWNiNzgtOTc2Yi00OGEwLTk5MjAtODdiZTk0ZDJlZGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "https://multiplex.ua/images/34/59/3459a9298fc6b5a4a9cc4f2d7de63ecd.jpeg",
  "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/06/how-to-train-your-dragon-the-hidden-world-poster.jpeg",
  "https://cdn.europosters.eu/image/1300/213147.jpg",
  "https://media.themoviedb.org/t/p/w440_and_h660_face/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
  "https://media.themoviedb.org/t/p/w600_and_h900_face/bR8ISy1O9XQxqiy0fQFw2BX72RQ.jpg",
  "https://m.media-amazon.com/images/I/81i1QiaNMaL._AC_UF894,1000_QL80_.jpg",
  "https://i.ebayimg.com/00/s/MTYwMFgxMDM1/z/sM8AAOSw3fZaOwmI/$_57.JPG?set_id=8800005007",
  "https://resizing.flixster.com/ko-hEHMbiGu6zup-oQx6yuoSt4k=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12009531_v_v10_ab.jpg",
  "https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
  "https://m.media-amazon.com/images/I/81nLIF+eJ7L._AC_UF1000,1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/91ejswAr0eL._AC_UF894,1000_QL80_.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStLVXEGRgSilajmqZ79UfkTy_hkDnKeod4k4u_7U-_-8wUlNBfjSVNx6cSH17gnQuDmYzqDQ&s=10",
];

const movies = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  rating: (Math.random() * 2 + 7).toFixed(1),
  image: `${
    movieImages[i % movieImages.length]
  }?auto=format&fit=crop&w=400&q=80`,
  video:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen text-white py-18">
        {/* ================= HERO ================= */}
        {featuredMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative h-[90vh] pt-20 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-2000"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" /> */}
            </div>

            <div className="relative h-full flex items-center px-12">
              <div className="max-w-2xl">
                <p className="text-yellow-400 mb-3 text-sm">{movie.genre}</p>

                <h1 className="text-3xl font-black mb-4">{movie.title}</h1>
                <p className="text-gray-400 mb-6 w-96">{movie.discription}</p>

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

          <div className="grid grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => openModal(movie)}
                className="group relative cursor-pointer"
              >
                <img
                  src={movie.image}
                  className="h-96 w-full object-cover rounded-lg "
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

              <video controls autoPlay className="w-full h-[75vh] object-cover">
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
    </div>
  );
}

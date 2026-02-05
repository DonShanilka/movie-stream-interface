'use client';

import { useState } from 'react';
import { Play, Plus, ThumbsUp, X, Heart, Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import VideoPlayer from './VideoPlayer';

interface Movie {
  Title: string;
  Description: string;
  Genre: string;
  Language: string;
  Country: string;
  ReleaseYear: number;
  Duration: number;
  AgeRating: string;
  Rating: string;
  MovieURL: string;
  Banner: string;
  Thumbnail: string;
}

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [animateBanner, setAnimateBanner] = useState(false);
  const [animatePlayer, setAnimatePlayer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const streamUrl = `http://localhost:8080/api/movies/getAllMovies?movie=${encodeURIComponent(
    movie.MovieURL
  )}`;

  const openBannerModal = () => {
    setShowBannerModal(true);
    setTimeout(() => setAnimateBanner(true), 30);
  };

  const closeBannerModal = () => {
    setAnimateBanner(false);
    setTimeout(() => setShowBannerModal(false), 200);
  };

  const openPlayerModal = () => {
    setShowPlayerModal(true);
    setTimeout(() => setAnimatePlayer(true), 30);
  };

  const closePlayerModal = () => {
    setAnimatePlayer(false);
    setTimeout(() => setShowPlayerModal(false), 200);
  };

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div
      className="relative z-0 hover:z-50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* MOVIE CARD WRAPPER */}
      <div
        className={`relative cursor-pointer transition-all duration-500 ease-out rounded-xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${isHovered ? 'scale-110 -translate-y-4' : 'scale-100 translate-y-0'
          }`}
        onClick={openBannerModal}
      >
        <img
          src={`data:image/png;base64,${movie.Thumbnail}`}
          alt={movie.Title}
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
              onClick={(e) => {
                e.stopPropagation();
                const favId = movie.Title;
                isFavorite(favId) ? removeFavorite(favId) : addFavorite({ id: favId, type: 'movie', data: movie });
              }}
              className="p-2 bg-black/60 rounded-full hover:bg-red-600 transition-colors group/fav"
            >
              <Heart
                className={`w-5 h-5 transition-all ${isFavorite(movie.Title) ? 'fill-red-500 text-red-500 scale-110' : 'text-white group-hover/fav:scale-110'
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
              {movie.Title}
            </h3>

            <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-gray-300 flex-wrap">
              <span className="text-yellow-400 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {movie.Rating}
              </span>
              <span>•</span>
              <span>{movie.ReleaseYear}</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 border border-white/30 rounded text-xs">
                {movie.AgeRating}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
              <span className="truncate max-w-[120px]">{movie.Genre}</span>
              <span>•</span>
              <span>{formatDuration(movie.Duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER + DETAILS MODAL */}
      {showBannerModal && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-500 ${animateBanner ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeBannerModal}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-neutral-900 rounded-2xl overflow-hidden max-w-4xl w-full mx-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 ${animateBanner ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
          >
            {/* CLOSE */}
            <button
              onClick={closeBannerModal}
              className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-red-500 p-2.5 rounded-full transition-colors group"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* BANNER IMAGE */}
            <div className="relative h-[500px] group/banner">
              <img
                src={`data:image/png;base64,${movie.Banner}`}
                className="w-full h-full object-cover"
                alt={movie.Title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />

              {/* OVERLAY ACTIONS */}
              <div className="absolute bottom-12 left-10 right-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-yellow-400 font-black text-sm tracking-widest uppercase">Feature Film</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="text-gray-400 font-bold text-sm">{formatDuration(movie.Duration)}</span>
                </div>
                <h2 className="text-5xl font-black text-white mb-8 tracking-tight drop-shadow-lg">{movie.Title}</h2>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={openPlayerModal}
                    className="bg-yellow-400 text-black px-10 py-4 rounded-xl font-black flex items-center gap-3 hover:bg-yellow-500 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/20 transition-all"
                  >
                    <Play className="w-6 h-6 fill-black" />
                    Watch Now
                  </button>
                  <button
                    onClick={() => isFavorite(movie.Title) ? removeFavorite(movie.Title) : addFavorite({ id: movie.Title, type: 'movie', data: movie })}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:scale-110 transition-all border border-white/5"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite(movie.Title) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:scale-110 transition-all border border-white/5">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* DETAILS CONTENT */}
            <div className="p-10 bg-neutral-900">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center gap-4 text-sm font-bold flex-wrap">
                    <span className="text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-current" />
                      {movie.Rating} Match
                    </span>
                    <span className="text-gray-400">{movie.ReleaseYear}</span>
                    <span className="border border-white/20 px-2 rounded text-xs text-gray-300 uppercase">{movie.AgeRating}</span>
                    <span className="bg-white/5 px-2 py-1 rounded text-xs text-gray-300 uppercase font-black">4K Ultra HD</span>
                    <span className="bg-white/5 px-2 py-1 rounded text-xs text-gray-300 uppercase font-black">Spatial Audio</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    {movie.Description}
                  </p>
                </div>

                <div className="space-y-6 border-l border-white/5 pl-8 hidden md:block">
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Genre</p>
                    <p className="text-white text-sm font-medium">{movie.Genre}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Original Language</p>
                    <p className="text-white text-sm font-medium">{movie.Language}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Production Country</p>
                    <p className="text-white text-sm font-medium">{movie.Country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL VIDEO PLAYER MODAL */}
      {showPlayerModal && (
        <div
          className={`fixed inset-0 z-[70] bg-black flex items-center justify-center transition-opacity duration-300 ${animatePlayer ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closePlayerModal}
        >
          <div
            className={`relative w-full h-full transform transition-all duration-300 ${animatePlayer ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE VIDEO */}
            <button
              onClick={closePlayerModal}
              className="absolute top-8 right-8 z-20 bg-black/40 hover:bg-black/60 p-4 rounded-full border border-white/10 group transition-all"
            >
              <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform" />
            </button>

            {/* VIDEO PLAYER */}
            <VideoPlayer src={streamUrl} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
}

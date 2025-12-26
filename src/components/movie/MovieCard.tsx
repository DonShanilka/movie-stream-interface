'use client';

import { useState } from 'react';
import { Play, Plus, ThumbsUp, X } from 'lucide-react';
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
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [animateBanner, setAnimateBanner] = useState(false);
  const [animatePlayer, setAnimatePlayer] = useState(false);

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
    <div>
      {/* MOVIE CARD */}
      <div className="relative group cursor-pointer" onMouseEnter={openBannerModal}>
        <img
          src={`data:image/png;base64,${movie.Thumbnail}`}
          alt={movie.Title}
          className="h-72 w-full object-cover rounded-lg transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
          <Play className="w-16 h-16 text-white" />
        </div>
      </div>

      {/* BANNER + DETAILS MODAL */}
      {showBannerModal && (
        <div
          className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center transition-opacity duration-1000 ${
            animateBanner ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeBannerModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-neutral-900 rounded-xl overflow-hidden max-w-3xl w-full transform transition-all duration-1000 ${
              animateBanner ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* CLOSE */}
            <button
              onClick={closeBannerModal}
              className="absolute top-4 right-4 z-20 bg-black/70 p-2 rounded-full"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* BANNER IMAGE */}
            <div className="relative h-[460px] bg-black">
              <img
                src={`data:image/png;base64,${movie.Banner}`}
                className="w-full h-full object-cover"
                alt={movie.Title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* OVERLAY */}
              <div className="absolute bottom-16 left-8 right-8">
                <h2 className="text-4xl font-bold text-white mb-4">{movie.Title}</h2>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={openPlayerModal}
                    className="bg-yellow-300 text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-yellow-400 transition"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    Play
                  </button>
                  <button className="p-3 bg-neutral-800 rounded-full">
                    <Plus className="text-white" />
                  </button>
                  <button className="p-3 bg-neutral-800 rounded-full">
                    <ThumbsUp className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8 text-white">
              <div className="flex gap-6 text-sm mb-4">
                <span className="text-green-500 font-semibold">{movie.Rating} Match</span>
                <span>{movie.ReleaseYear}</span>
                <span className="border px-2">{movie.AgeRating}</span>
                <span>{formatDuration(movie.Duration)}</span>
                <span className="border px-2">HD</span>
              </div>
              <p className="text-gray-300 mb-6">{movie.Description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <p><b>Genre:</b> {movie.Genre}</p>
                <p><b>Language:</b> {movie.Language}</p>
                <p><b>Country:</b> {movie.Country}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL VIDEO PLAYER MODAL */}
      {showPlayerModal && (
        <div
          className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-200 ${
            animatePlayer ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closePlayerModal}
        >
          <div
            className={`relative w-full max-w-6xl transform transition-all duration-200 ${
              animatePlayer ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE VIDEO */}
            <button
              onClick={closePlayerModal}
              className="absolute top-4 right-4 z-20 bg-black/70 p-2 rounded-full"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* VIDEO PLAYER */}
            <VideoPlayer src={streamUrl} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
}

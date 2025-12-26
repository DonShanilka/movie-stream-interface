'use client';

import { useState } from 'react';
import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from 'lucide-react';

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
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Backend proxy streaming URL
  const streamUrl = `http://localhost:8080/api/movies/stream?movie=${encodeURIComponent(
    movie.MovieURL
  )}`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPlaying(false);
  };

  // Format duration (assuming it's in minutes)
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <>
      {/* Movie Card */}
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setShowModal(true)}
      >
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={`data:image/png;base64,${movie.Thumbnail}`}
            alt={movie.Title}
            className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Simple Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-16 h-16 text-white" />
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-neutral-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 bg-neutral-900 rounded-full p-2 hover:bg-neutral-800 transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video/Banner Section */}
            <div className="relative h-[450px] bg-black">
              {isPlaying ? (
                <video
                  src={streamUrl}
                  controls
                  autoPlay
                  muted={isMuted}
                  className="w-full h-full object-cover"
                  controlsList="nodownload"
                />
              ) : (
                <>
                  <img
                    src={`data:image/png;base64,${movie.Banner}`}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-16 left-8 right-8">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {movie.Title}
                    </h2>
                    <div className="flex gap-3">
                      <button
                        onClick={handlePlayClick}
                        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
                      >
                        <Play className="w-5 h-5 fill-black" />
                        Play
                      </button>
                      <button className="p-3 bg-neutral-800/80 rounded-full hover:bg-neutral-700 transition border-2 border-gray-500">
                        <Plus className="w-6 h-6 text-white" />
                      </button>
                      <button className="p-3 bg-neutral-800/80 rounded-full hover:bg-neutral-700 transition border-2 border-gray-500">
                        <ThumbsUp className="w-6 h-6 text-white" />
                      </button>
                      {isPlaying && (
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="ml-auto p-3 bg-neutral-800/80 rounded-full hover:bg-neutral-700 transition border-2 border-gray-500"
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6 text-white" />
                          ) : (
                            <Volume2 className="w-6 h-6 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Movie Details */}
            <div className="p-8">
              <div className="flex gap-8">
                {/* Left Column */}
                <div className="flex-1">
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-green-500 font-semibold">
                      {movie.Rating} Match
                    </span>
                    <span className="text-gray-300">{movie.ReleaseYear}</span>
                    <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
                      {movie.AgeRating}
                    </span>
                    <span className="text-gray-300">{formatDuration(movie.Duration)}</span>
                    <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
                      HD
                    </span>
                    <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
                      🔊
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {movie.Description}
                  </p>
                </div>

                {/* Right Column */}
                <div className="w-72 space-y-4 text-sm">
                  <div>
                    <span className="text-gray-500">Cast: </span>
                    <span className="text-white">
                      Nicolas Cage, Emma Stone, Ryan Reynolds, <span className="text-gray-400">more</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Genres: </span>
                    <span className="text-white">{movie.Genre}</span>
                  </div>

                  <div>
                    <span className="text-gray-500">Language: </span>
                    <span className="text-white">{movie.Language}</span>
                  </div>

                  <div>
                    <span className="text-gray-500">Country: </span>
                    <span className="text-white">{movie.Country}</span>
                  </div>

                  <div>
                    <span className="text-gray-500">This Movie Is: </span>
                    <span className="text-white">Imaginative, Feel-Good</span>
                  </div>
                </div>
              </div>

              {/* More Like This Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-4">More Like This</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-neutral-800 rounded-lg overflow-hidden">
                      <div className="h-32 bg-neutral-700" />
                      <div className="p-3">
                        <h4 className="text-white font-semibold text-sm mb-1">Similar Movie {item}</h4>
                        <p className="text-gray-400 text-xs line-clamp-2">
                          Another great movie you might enjoy watching.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
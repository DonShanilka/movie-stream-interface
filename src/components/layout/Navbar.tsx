"use client";

import Link from "next/link";
import { Search, User, X, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Movie } from "@/types/movie";
import VideoModal from "@/components/movie/VideoModal";
import SeriesModal from "@/components/series/SeriesModal";
import MovieModal from "@/components/movie/MovieCard";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movie" },
  { name: "TV Series", href: "/tv" },
  { name: "New & Popular", href: "/newAndpopuler" },
  { name: "My List", href: "/mylist" },
];

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
  Thumbnail: string;
  ReleaseYear: number;
  Language: string;
  SeasonCount: number;
  Country: string;
  AgeRating: string;
  Rating: number;
  Genre: string;
  Trailer?: string;
}

interface Episode {
  ID: number;
  SeriesID: number;
  SeasonNumber: number;
  EpisodeNumber: number;
  Title: string;
  Episode: string;
}

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<TVSeries | null>(null);
  const [episodesMap, setEpisodesMap] = useState<Record<number, Episode[]>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<Record<number, boolean>>({});
  const [showPlayer, setShowPlayer] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch("http://localhost:8080/api/movies/getAllMovies"),
          fetch("http://localhost:8081/api/series/getAllSeries"),
        ]);

        const moviesJson = await moviesRes.json();
        const seriesJson = await seriesRes.json();

        const filteredMovies = moviesJson.filter((m: Movie) =>
          m.Title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const filteredSeries = seriesJson.filter((s: TVSeries) =>
          s.Title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults([
          ...filteredMovies.map((m: Movie) => ({ ...m, type: "movie" })),
          ...filteredSeries.map((s: TVSeries) => ({ ...s, type: "series" })),
        ]);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSeriesClick = async (series: TVSeries) => {
    setSearchOpen(false);
    setSelectedSeries(series);

    if (episodesMap[series.ID]) return;

    setLoadingEpisodes((prev) => ({ ...prev, [series.ID]: true }));
    try {
      const res = await fetch(
        `http://localhost:8081/api/episodes/bySeriesId?seriesId=${series.ID}`,
      );
      if (res.ok) {
        const data = await res.json();
        setEpisodesMap((prev) => ({ ...prev, [series.ID]: data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEpisodes((prev) => ({ ...prev, [series.ID]: false }));
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-12 py-4 flex items-center justify-between ${isScrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
          }`}
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-black text-yellow-400 tracking-tighter hover:scale-105 transition-transform">
            STREAMBERRY
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-gray-300 hover:text-white transition cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* SEARCH */}
          <div ref={searchRef} className="relative flex items-center">
            <div
              className={`flex items-center bg-black/40 border border-white/10 rounded-full transition-all duration-500 overflow-hidden ${searchOpen ? "w-72 px-4 py-2" : "w-10 h-10 justify-center"
                }`}
            >
              <Search
                size={20}
                className="text-gray-400 cursor-pointer min-w-[20px]"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                placeholder="Titles, people, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-3 bg-transparent border-none outline-none text-sm text-white w-full transition-opacity duration-300 ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              />
              {searchOpen && searchQuery && (
                <X
                  size={16}
                  className="text-gray-500 cursor-pointer hover:text-white"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-14 right-0 w-[450px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="max-h-[500px] overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (result.type === "movie") {
                          setSelectedMovie(result as Movie);
                          setShowPlayer(false);
                        } else {
                          handleSeriesClick(result as TVSeries);
                        }
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-white/5 transition cursor-pointer border-b border-white/5 last:border-0"
                    >
                      <img
                        src={`data:image/png;base64,${result.Thumbnail || result.Banner}`}
                        alt={result.Title}
                        className="w-20 h-12 object-cover rounded shadow"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white mb-0.5">{result.Title}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          <span className="text-yellow-400">{result.type}</span>
                          <span>•</span>
                          <span>{result.ReleaseYear}</span>
                          <span>•</span>
                          <span className="border px-1 rounded-sm border-gray-700">{result.AgeRating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AUTH / PROFILE */}
          <div ref={profileRef} className="relative">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black shadow-lg">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute top-14 right-0 w-64 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="px-5 py-4 border-b border-white/5 mb-2">
                      <p className="text-sm font-black text-white">{currentUser.name}</p>
                      <p className="text-xs font-medium text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <Link href="/mylist" className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition text-sm font-bold text-gray-300 hover:text-white">
                      <User size={18} /> My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/10 transition text-sm font-bold text-red-500"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-black transition-all shadow-lg shadow-yellow-400/10 active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MODALS */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={() => setShowPlayer(true)}
        />
      )}

      {showPlayer && selectedMovie && (
        <VideoModal
          open={showPlayer}
          movie={selectedMovie}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {selectedSeries && (
        <SeriesModal
          series={selectedSeries}
          episodes={episodesMap[selectedSeries.ID]}
          loading={!!loadingEpisodes[selectedSeries.ID]}
          onClose={() => setSelectedSeries(null)}
        />
      )}
    </>
  );
}

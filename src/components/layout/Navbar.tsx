"use client";

import Link from "next/link";
import { Search, User, X, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Movie } from "@/types/movie";
import VideoModal from "@/components/movie/VideoModal";
import SeriesModal from "@/components/series/SeriesModal";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movie" },
  { name: "TV Series", href: "/tv" },
  { name: "New & Popular", href: "/new-popular" },
  { name: "My List", href: "/my-list" },
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [seriesList, setSeriesList] = useState<TVSeries[]>([]);
  const [filteredResults, setFilteredResults] = useState<(Movie | TVSeries)[]>(
    [],
  );

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<TVSeries | null>(null);
  const [episodesMap, setEpisodesMap] = useState<Record<number, Episode[]>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<Record<number, boolean>>({});

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch("http://localhost:8080/api/movies/getAllMovies"),
          fetch("http://localhost:8081/api/series/getAllSeries"),
        ]);

        if (moviesRes.ok) {
          const moviesData = await moviesRes.json();
          setMovies(moviesData);
        }
        if (seriesRes.ok) {
          const seriesData = await seriesRes.json();
          setSeriesList(seriesData);
        }
      } catch (error) {
        console.error("Failed to fetch search data", error);
      }
    };

    fetchData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const movieMatches = movies.filter((m) =>
      m.Title.toLowerCase().includes(query),
    );
    const seriesMatches = seriesList.filter((s) =>
      s.Title.toLowerCase().includes(query),
    );

    setFilteredResults([...movieMatches, ...seriesMatches]);
  }, [searchQuery, movies, seriesList]);

  // Click Outside to Close Search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSeriesClick = async (series: TVSeries) => {
    setIsSearchOpen(false);
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between px-12 py-4">
          {/* Logo + Menu */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-extrabold text-yellow-400">
              StreamBerry
            </Link>

            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div
              ref={searchRef}
              className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? "w-64" : "w-10"}`}
            >
              <div
                className={`absolute right-0 flex items-center overflow-hidden bg-white/10 rounded-full transition-all duration-300 ${isSearchOpen ? "w-full px-3 py-2" : "w-10 h-10 hover:bg-white/20 cursor-pointer justify-center"}`}
              >
                {isSearchOpen ? (
                  <>
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Titles, people, genres"
                      className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder-gray-400"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                      className="ml-1 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Search className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery && (
                <div className="absolute top-12 right-0 w-80 bg-neutral-900 rounded-lg shadow-2xl overflow-hidden max-h-96 overflow-y-auto border border-white/10">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item: any) => (
                      <div
                        key={item.Id || item.ID}
                        className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition border-b border-white/5 last:border-0"
                        onClick={() => {
                          if ("MovieURL" in item) {
                            const movieForModal = {
                              ...item,
                              trailer: item.MovieURL,
                            };
                            setSelectedMovie(movieForModal);
                            setIsSearchOpen(false);
                          } else {
                            // It's a TV Series
                            handleSeriesClick(item);
                          }
                        }}
                      >
                        <img
                          src={`data:image/png;base64,${item.Thumbnail}`}
                          alt={item.Title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="text-white text-sm font-semibold">
                            {item.Title}
                          </h4>
                          <p className="text-gray-400 text-xs">
                            {"MovieURL" in item ? "Movie" : "TV Series"} •{" "}
                            {item.ReleaseYear}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="p-2 rounded-full hover:bg-white/10 transition">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      {selectedMovie && (
        <VideoModal
          open={!!selectedMovie}
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
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

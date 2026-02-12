"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MovieCard from "@/components/movie/MovieCard";
import SeriesCard from "@/components/series/SeriesCard";
import SeriesModal from "@/components/series/SeriesModal";
import { useFavorites } from "@/context/FavoritesContext";

export default function MyListPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<any[]>([]);
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
  const [episodesMap, setEpisodesMap] = useState<Record<number, any[]>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch("http://localhost:8080/api/movies/getAllMovies"),
          fetch("http://localhost:8081/api/series/getAllSeries"),
        ]);

        if (moviesRes.ok) setMovies(await moviesRes.json());
        if (seriesRes.ok) setSeriesList(await seriesRes.json());
      } catch (err) {
        console.error("Failed to fetch data for My List", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadEpisodes = (seriesID: number) => {
    if (episodesMap[seriesID]) return;
    setLoadingEpisodes((prev) => ({ ...prev, [seriesID]: true }));

    fetch(`http://localhost:8081/api/episodes/bySeriesId?seriesId=${seriesID}`)
      .then((res) => res.json())
      .then((episodes) => {
        setEpisodesMap((prev) => ({ ...prev, [seriesID]: episodes }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingEpisodes((prev) => ({ ...prev, [seriesID]: false }));
      });
  };

  // Filtered Content
  const favoriteMovies = movies.filter((m) =>
    favorites.some(
      (f) => f.type === "movie" && (f.id === m.Id || f.id === m.Title)
    )
  );
  const favoriteSeries = seriesList.filter((s) =>
    favorites.some((f) => f.type === "series" && f.id === s.ID)
  );

  const allFavorites = [
    ...favoriteMovies.map((m) => ({ type: "movie" as const, data: m })),
    ...favoriteSeries.map((s) => ({ type: "series" as const, data: s })),
  ];

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="px-12 py-24">
        <h1 className="text-3xl font-bold mb-8">My List</h1>

        {allFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-xl">Your list is empty.</p>
            <p className="mt-2 text-sm text-gray-600">
              Add some movies and TV series to keep track of them!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {allFavorites.map((item, index) => {
              if (item.type === "movie") {
                return <MovieCard key={`movie-${index}`} movie={item.data} />;
              } else {
                return (
                  <SeriesCard
                    key={`series-${index}`}
                    series={item.data}
                    onClick={() => {
                      setSelectedSeries(item.data);
                      loadEpisodes(item.data.ID);
                    }}
                  />
                );
              }
            })}
          </div>
        )}
      </div>

      {selectedSeries && (
        <SeriesModal
          series={selectedSeries}
          episodes={episodesMap[selectedSeries.ID]}
          loading={!!loadingEpisodes[selectedSeries.ID]}
          onClose={() => setSelectedSeries(null)}
        />
      )}
    </div>
  );
}

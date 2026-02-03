"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SeriesCard from "@/components/series/SeriesCard";
import SeriesModal from "@/components/series/SeriesModal";
import GenreBar from "@/components/UI/GenreBar";

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
  Thumbnail: string;
  Genre: string;
  ReleaseYear: number;
  Language: string;
  SeasonCount: number;
  Country: string;
  AgeRating: string;
  Rating: number;
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

export default function TVSeriesPage() {
  const [seriesList, setSeriesList] = useState<TVSeries[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<TVSeries[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState<string[]>([]);
  const [episodesMap, setEpisodesMap] = useState<Record<number, Episode[]>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<
    Record<number, boolean>
  >({});
  const [selectedSeries, setSelectedSeries] = useState<TVSeries | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load series
  useEffect(() => {
    fetch("http://localhost:8081/api/series/getAllSeries")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load series (${res.status})`);
        }
        return res.json();
      })
      .then((data: TVSeries[]) => {
        setSeriesList(data);
        setFilteredSeries(data);
        const uniqueGenres = Array.from(new Set(data.map(s => s.Genre))).filter(Boolean);
        setGenres(uniqueGenres);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load TV series.");
      });
  }, []);

  // Filter Logic
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredSeries(seriesList);
    } else {
      setFilteredSeries(seriesList.filter(s => s.Genre === selectedGenre));
    }
  }, [selectedGenre, seriesList]);

  // Load episodes
  const loadEpisodes = (seriesID: number) => {
    if (episodesMap[seriesID]) return;

    setLoadingEpisodes((prev) => ({ ...prev, [seriesID]: true }));

    fetch(`http://localhost:8081/api/episodes/bySeriesId?seriesId=${seriesID}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load episodes (${res.status})`);
        }
        return res.json();
      })
      .then((episodes: Episode[]) => {
        console.log("seriesID", seriesID);
        setEpisodesMap((prev) => ({ ...prev, [seriesID]: episodes }));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingEpisodes((prev) => ({ ...prev, [seriesID]: false }));
      });
  };

  return (
    <div className="bg-black min-h-screen text-white px-12 py-24">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">TV Series</h1>

      <GenreBar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredSeries.map((series) => (
          <SeriesCard
            key={series.ID}
            series={series}
            onClick={() => {
              setSelectedSeries(series);
              loadEpisodes(series.ID);
            }}
          />
        ))}
      </div>

      {filteredSeries.length === 0 && !error && (
        <div className="text-center py-20 text-gray-500">
          No TV series found in this genre.
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">
          {error}
        </div>
      )}

      {/* ✅ SINGLE MODAL */}
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

'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import SeriesCard from '@/components/series/SeriesCard';
import SeriesModal from '@/components/series/SeriesModal';

interface TVSeries {
  ID: number;
  Title: string;
  Description: string;
  Banner: string;
  Thumbnail: string;
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
  const [episodesMap, setEpisodesMap] = useState<Record<number, Episode[]>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<Record<number, boolean>>({});

  const [selectedSeries, setSelectedSeries] = useState<TVSeries | null>(null);

  // Load series
  useEffect(() => {
    fetch('http://localhost:8080/api/series/getAllSeries')
      .then((res) => res.json())
      .then(setSeriesList)
      .catch(console.error);
  }, []);

  // Load episodes
  const loadEpisodes = (seriesID: number) => {
    if (episodesMap[seriesID]) return;

    setLoadingEpisodes((p) => ({ ...p, [seriesID]: true }));

    fetch(`http://localhost:8080/api/episodes/bySeriesId?seriesId=${seriesID}`)
      .then((res) => res.json())
      .then((episodes) =>
        setEpisodesMap((p) => ({ ...p, [seriesID]: episodes }))
      )
      .finally(() =>
        setLoadingEpisodes((p) => ({ ...p, [seriesID]: false }))
      );
  };

  return (
    <div className="bg-black min-h-screen text-white px-12 py-10">
      <Navbar />
      <h1 className="text-3xl font-bold mb-10">TV Series</h1>

      <div className="grid grid-cols-5 gap-6">
        {seriesList.map((series) => (
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

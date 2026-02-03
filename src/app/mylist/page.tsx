'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import SeriesCard from '@/components/series/SeriesCard';
import SeriesModal from '@/components/series/SeriesModal';
import { useFavorites } from '@/context/FavoritesContext';

export default function MyListPage() {
    const { favorites } = useFavorites();
    const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
    const [episodesMap, setEpisodesMap] = useState<Record<number, any[]>>({});
    const [loadingEpisodes, setLoadingEpisodes] = useState<Record<number, boolean>>({});

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

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="px-12 py-24">
                <h1 className="text-3xl font-bold mb-8">My List</h1>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <p className="text-xl">Your list is empty.</p>
                        <p className="mt-2 text-sm text-gray-600">Add some movies and TV series to keep track of them!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {favorites.map((item) => {
                            if (item.type === 'movie') {
                                return <MovieCard key={item.id} movie={item.data} />;
                            } else {
                                return (
                                    <SeriesCard
                                        key={item.id}
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
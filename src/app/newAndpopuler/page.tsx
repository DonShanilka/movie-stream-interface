'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import SeriesCard from '@/components/series/SeriesCard';
import SeriesModal from '@/components/series/SeriesModal';

export default function NewAndPopularPage() {
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
                    fetch('http://localhost:8080/api/movies/getAllMovies'),
                    fetch('http://localhost:8081/api/series/getAllSeries')
                ]);

                if (moviesRes.ok) setMovies(await moviesRes.json());
                if (seriesRes.ok) setSeriesList(await seriesRes.json());
            } catch (err) {
                console.error('Failed to fetch data for New & Popular', err);
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

    // --- SORTING LOGIC ---

    const newReleases = useMemo(() => {
        const combined = [
            ...movies.map(m => ({ item: m, type: 'movie' })),
            ...seriesList.map(s => ({ item: s, type: 'series' }))
        ];
        return combined
            .sort((a, b) => (b.item.ReleaseYear || 0) - (a.item.ReleaseYear || 0))
            .slice(0, 12);
    }, [movies, seriesList]);

    const popularNow = useMemo(() => {
        const combined = [
            ...movies.map(m => ({ item: m, type: 'movie' })),
            ...seriesList.map(s => ({ item: s, type: 'series' }))
        ];
        return combined
            .sort((a, b) => (b.item.Rating || 0) - (a.item.Rating || 0))
            .slice(0, 12);
    }, [movies, seriesList]);

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
        <div className="bg-black min-h-screen text-white pb-20">
            <Navbar />

            <div className="px-12 py-24 space-y-16">
                {/* SECTION: NEW RELEASES */}
                <section>
                    <h1 className="text-3xl font-bold mb-8">New Releases</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {newReleases.map((data, idx) => (
                            data.type === 'movie' ? (
                                <MovieCard key={`new-movie-${idx}`} movie={data.item} />
                            ) : (
                                <SeriesCard
                                    key={`new-series-${idx}`}
                                    series={data.item}
                                    onClick={() => {
                                        setSelectedSeries(data.item);
                                        loadEpisodes(data.item.ID);
                                    }}
                                />
                            )
                        ))}
                    </div>
                </section>

                {/* SECTION: POPULAR NOW */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Popular Now</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {popularNow.map((data, idx) => (
                            data.type === 'movie' ? (
                                <MovieCard key={`pop-movie-${idx}`} movie={data.item} />
                            ) : (
                                <SeriesCard
                                    key={`pop-series-${idx}`}
                                    series={data.item}
                                    onClick={() => {
                                        setSelectedSeries(data.item);
                                        loadEpisodes(data.item.ID);
                                    }}
                                />
                            )
                        ))}
                    </div>
                </section>
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
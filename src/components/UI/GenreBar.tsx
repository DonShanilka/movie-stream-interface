'use client';

import React from 'react';

interface GenreBarProps {
    genres: string[];
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}

export default function GenreBar({ genres, selectedGenre, onGenreSelect }: GenreBarProps) {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
            <button
                onClick={() => onGenreSelect('All')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedGenre === 'All'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700'
                    }`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onGenreSelect(genre)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedGenre === genre
                            ? 'bg-yellow-400 text-black'
                            : 'bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700'
                        }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}

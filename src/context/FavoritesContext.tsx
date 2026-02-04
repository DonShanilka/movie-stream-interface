'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type FavoriteItem = {
    id: string | number;
    type: 'movie' | 'series';
    data: any;
};

interface FavoritesContextType {
    favorites: FavoriteItem[];
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string | number) => void;
    isFavorite: (id: string | number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('streamberry_favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    // Save to localStorage on change (strip heavy data to avoid quota exceeded error)
    useEffect(() => {
        const minimalFavorites = favorites.map(({ id, type }) => ({ id, type }));
        localStorage.setItem('streamberry_favorites', JSON.stringify(minimalFavorites));
    }, [favorites]);

    const addFavorite = (item: FavoriteItem) => {
        setFavorites((prev) => [...prev, item]);
    };

    const removeFavorite = (id: string | number) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    const isFavorite = (id: string | number) => {
        return favorites.some((item) => item.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}

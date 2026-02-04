'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    profileImage?: string; // Base64 or URL
    isActive: boolean;
    createdAt: string;
}

interface AuthContextType {
    currentUser: User | null;
    users: User[];
    login: (email: string, passwordHash: string) => Promise<{ success: boolean; message?: string }>;
    signUp: (name: string, email: string, passwordHash: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [mounted, setMounted] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const storedUsers = localStorage.getItem('streamberry_users');
        const storedUser = localStorage.getItem('streamberry_current_user');

        if (storedUsers) {
            try {
                setUsers(JSON.parse(storedUsers));
            } catch (e) {
                console.error('Failed to parse users', e);
            }
        }

        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse current user', e);
            }
        }
        setMounted(true);
    }, []);

    // Sync to localStorage
    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('streamberry_users', JSON.stringify(users));
    }, [users, mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (currentUser) {
            localStorage.setItem('streamberry_current_user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('streamberry_current_user');
        }
    }, [currentUser, mounted]);

    const signUp = async (name: string, email: string, passwordHash: string) => {
        // Check if user exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser: User = {
            id: Date.now(),
            name,
            email,
            passwordHash,
            isActive: true,
            createdAt: new Date().toISOString(),
        };

        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);

        return { success: true };
    };

    const login = async (email: string, passwordHash: string) => {
        const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

        if (user) {
            setCurrentUser(user);
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, users, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

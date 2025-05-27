import { Movie } from '@/interfaces/interfaces';
import React, { createContext, useContext, useState } from 'react';

interface SavedMoviesContextType {
  savedMovies: Movie[];
  toggleSaveMovie: (movie: Movie) => void;
  isMovieSaved: (movieId: number) => boolean;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  const toggleSaveMovie = (movie: Movie) => {
    setSavedMovies(prev => {
      const isSaved = prev.some(m => m.id === movie.id);
      if (isSaved) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isMovieSaved = (movieId: number) => {
    return savedMovies.some(movie => movie.id === movieId);
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, toggleSaveMovie, isMovieSaved }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (context === undefined) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
}; 
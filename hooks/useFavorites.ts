"use client";

import { useState, useEffect } from "react";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  difficulty: string;
  servings: number;
  emoji: string;
}
export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // La pornire, citește favoritele din localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Adaugă la favorite
  const addFavorite = (recipe: Recipe) => {
    const updated = [...favorites, recipe];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Șterge din favorite
  const removeFavorite = (id: string) => {
    const updated = favorites.filter((r) => r.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Verifică dacă e deja la favorite
  const isFavorite = (id: string) => {
    return favorites.some((r) => r.id === id);
  };

  // Toggle — dacă e favorite îl scoate, dacă nu e îl adaugă
  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return { favorites, toggleFavorite, isFavorite };
}
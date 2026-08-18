"use client";

import { Recipe } from "@/hooks/useFavorites";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();
  const favorite = isFavorite(recipe.id);

  return (
    <div className="rounded-xl p-4 transition-all hover:scale-105 hover:shadow-2xl"
      style={{
        backgroundColor: "rgba(255, 245, 225, 0.95)",
        border: "2px solid #c17a3a",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      {/* Emoji + Titlu + Favorite */}
      <div className="flex items-start justify-between mb-2">
        <div
          className="flex items-center gap-2 cursor-pointer flex-1"
          onClick={() => router.push(`/recipes/${recipe.id}?title=${encodeURIComponent(recipe.title)}`)}
        >
          <span className="text-4xl">{recipe.emoji}</span>
          <h2 className="text-base font-bold" style={{ color: "#3d1f0a", fontFamily: "Georgia, serif" }}>
            {recipe.title}
          </h2>
        </div>
        <button
          onClick={() => toggleFavorite(recipe)}
          className="text-2xl ml-2 transition-transform hover:scale-125"
        >
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Descriere */}
      <p className="text-sm mb-3" style={{ color: "#6b3a1f" }}>{recipe.description}</p>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap mb-3">
        <span className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: "#f5d9a8", color: "#8b5520" }}>
          ⏱ {recipe.cookTime} min
        </span>
        <span className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: "#f5d9a8", color: "#8b5520" }}>
          👤 {recipe.servings} porții
        </span>
        <span className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: "#f5d9a8", color: "#8b5520" }}>
          {recipe.difficulty}
        </span>
      </div>

      {/* Buton */}
      <button
        onClick={() => router.push(`/recipes/${recipe.id}?title=${encodeURIComponent(recipe.title)}`)}
        className="w-full py-2 rounded-lg text-sm font-bold transition-all"
        style={{ backgroundColor: "#c17a3a", color: "#fff8ee" }}
      >
        Vezi rețeta →
      </button>
    </div>
  );
}
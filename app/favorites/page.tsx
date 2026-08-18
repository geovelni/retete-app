"use client";

import { useFavorites } from "@/context/FavoritesContext";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen" style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      <div className="min-h-screen" style={{ backgroundColor: "rgba(30,15,5,0.6)" }}>

        {/* Header */}
        <div style={{ backgroundColor: "rgba(101,55,20,0.92)", borderBottom: "2px solid #c17a3a" }}>
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-sm font-medium" style={{ color: "#f5d9a8" }}>
              ← Înapoi la căutare
            </Link>
            <h1 className="text-xl font-bold" style={{ color: "#f5d9a8", fontFamily: "Georgia, serif" }}>
              🍳 Rețetele bunicii
            </h1>
            <div className="w-24" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-2"
            style={{ color: "#f5d9a8", fontFamily: "Georgia, serif", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
            ❤️ Favoritele tale
          </h2>
          <p className="mb-8" style={{ color: "#e8c98a" }}>
            {favorites.length === 0 ? "Nu ai salvat nicio rețetă încă" : `${favorites.length} rețete salvate`}
          </p>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🤍</div>
              <p className="mb-6" style={{ color: "#e8c98a" }}>
                Caută rețete și apasă ❤️ pentru a le salva aici
              </p>
              <Link href="/"
                className="px-6 py-3 rounded-lg text-sm font-bold"
                style={{ backgroundColor: "#c17a3a", color: "#fff8ee" }}>
                Caută rețete
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
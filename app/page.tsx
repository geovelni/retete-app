"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/hooks/useFavorites";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchRecipes = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`Eroare: ${response.status}`);
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error("Eroare la căutare:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchRecipes();
  };

  return (
    <main className="min-h-screen" style={{
      backgroundImage: `url('/bg.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      {/* Overlay întunecat peste imagine */}
      <div className="min-h-screen" style={{ backgroundColor: "rgba(30, 15, 5, 0.6)" }}>

        {/* Header */}
        <div style={{ backgroundColor: "rgba(101, 55, 20, 0.92)", borderBottom: "2px solid #c17a3a" }}>
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: "#f5d9a8", fontFamily: "Georgia, serif" }}>
              🍳 RețeteAI
            </h1>
            <Link href="/favorites" className="text-sm font-medium transition-colors"
              style={{ color: "#f5d9a8" }}
              onMouseOver={e => (e.currentTarget.style.color = "#c17a3a")}
              onMouseOut={e => (e.currentTarget.style.color = "#f5d9a8")}
            >
              ❤️ Favorite
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-5xl font-bold mb-4" style={{ color: "#f5d9a8", fontFamily: "Georgia, serif", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
            Ce gătim azi?
          </h2>
          <p className="text-lg mb-10" style={{ color: "#e8c98a" }}>
            Scrie un ingredient sau o rețetă și lasă AI-ul să te inspire
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ex: paste, pui cu lămâie, supă..."
              className="flex-1 px-4 py-3 text-sm rounded-lg focus:outline-none"
              style={{
                backgroundColor: "rgba(255, 245, 225, 0.95)",
                border: "2px solid #c17a3a",
                color: "#3d1f0a",
              }}
            />
            <button
              onClick={searchRecipes}
              disabled={loading}
              className="px-6 py-3 rounded-lg text-sm font-bold transition-all"
              style={{
                backgroundColor: loading ? "#a06030" : "#c17a3a",
                color: "#fff8ee",
                border: "2px solid #8b5520",
              }}
            >
              {loading ? "Caut..." : "🔍 Caută"}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 animate-bounce">👨‍🍳</div>
            <p style={{ color: "#e8c98a" }}>Gemini pregătește rețetele...</p>
          </div>
        )}

        {/* Rezultate */}
        {!loading && recipes.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-12">
            <p className="text-sm mb-6" style={{ color: "#e8c98a" }}>
              {recipes.length} rețete găsite pentru &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* Niciun rezultat */}
        {!loading && searched && recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😕</div>
            <p style={{ color: "#e8c98a" }}>Nu am găsit rețete. Încearcă altceva!</p>
          </div>
        )}

        {/* Stare inițială */}
        {!searched && (
          <div className="text-center pb-16" style={{ color: "#e8c98a" }}>
            <p>✨ Caută orice ingredient sau fel de mâncare!</p>
          </div>
        )}

      </div>
    </main>
  );
}

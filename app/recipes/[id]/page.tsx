"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Recipe } from "@/hooks/useFavorites";

interface DetailedRecipe extends Recipe {
  prepTime: number;
  ingredients: { amount: string; unit: string; name: string }[];
  steps: { step: number; instruction: string }[];
  tips: string;
}

export default function RecipePage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = searchParams.get("title") || id;
  const { toggleFavorite, isFavorite } = useFavorites();

  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `/api/recipe/${id}?title=${encodeURIComponent(title as string)}`
        );
        if (!response.ok) throw new Error(`Eroare: ${response.status}`);
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Eroare:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ backgroundColor: "rgba(30,15,5,0.7)" }} className="min-h-screen w-full flex flex-col items-center justify-center">
          <div className="text-6xl mb-4 animate-bounce">👨‍🍳</div>
          <p style={{ color: "#e8c98a" }}>Gemini pregătește rețeta...</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  const favorite = isFavorite(recipe.id);

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
          <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <button onClick={() => router.back()}
              className="text-sm font-medium transition-colors"
              style={{ color: "#f5d9a8" }}>
              ← Înapoi
            </button>
            <h1 className="text-xl font-bold" style={{ color: "#f5d9a8", fontFamily: "Georgia, serif" }}>
              🍳 RețeteAI
            </h1>
            <button onClick={() => toggleFavorite(recipe)}
              className="text-2xl hover:scale-110 transition-transform">
              {favorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Titlu */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{recipe.emoji}</div>
            <h2 className="text-3xl font-bold mb-2"
              style={{ color: "#f5d9a8", fontFamily: "Georgia, serif", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
              {recipe.title}
            </h2>
            <p style={{ color: "#e8c98a" }}>{recipe.description}</p>
          </div>

          {/* Info rapide */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: "Pregătire", value: `${recipe.prepTime} min`, icon: "🔪" },
              { label: "Gătire", value: `${recipe.cookTime} min`, icon: "🔥" },
              { label: "Porții", value: recipe.servings, icon: "🍽️" },
              { label: "Dificultate", value: recipe.difficulty, icon: "⭐" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "rgba(255,245,225,0.92)", border: "2px solid #c17a3a" }}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs" style={{ color: "#8b5520" }}>{item.label}</div>
                <div className="font-bold text-sm" style={{ color: "#3d1f0a" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Ingrediente */}
          <div className="rounded-xl p-6 mb-6"
            style={{ backgroundColor: "rgba(255,245,225,0.92)", border: "2px solid #c17a3a" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#3d1f0a", fontFamily: "Georgia, serif" }}>
              🛒 Ingrediente
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2" style={{ color: "#6b3a1f" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#c17a3a" }} />
                  <span className="font-medium">{ing.amount} {ing.unit}</span>
                  <span>{ing.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pași */}
          <div className="rounded-xl p-6 mb-6"
            style={{ backgroundColor: "rgba(255,245,225,0.92)", border: "2px solid #c17a3a" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#3d1f0a", fontFamily: "Georgia, serif" }}>
              👨‍🍳 Mod de preparare
            </h3>
            <ol className="space-y-4">
              {recipe.steps.map((s) => (
                <li key={s.step} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{ backgroundColor: "#c17a3a", color: "#fff8ee" }}>
                    {s.step}
                  </span>
                  <p className="pt-1" style={{ color: "#6b3a1f" }}>{s.instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {recipe.tips && (
            <div className="rounded-xl p-6 mb-6"
              style={{ backgroundColor: "rgba(245,217,168,0.95)", border: "2px solid #c17a3a" }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#3d1f0a", fontFamily: "Georgia, serif" }}>
                💡 Sfat
              </h3>
              <p style={{ color: "#6b3a1f" }}>{recipe.tips}</p>
            </div>
          )}

          {/* Buton favorite */}
          <button onClick={() => toggleFavorite(recipe)}
            className="w-full py-3 rounded-xl font-bold transition-all"
            style={{
              backgroundColor: favorite ? "rgba(255,245,225,0.92)" : "#c17a3a",
              color: favorite ? "#c17a3a" : "#fff8ee",
              border: "2px solid #c17a3a",
            }}>
            {favorite ? "❤️ Șterge din favorite" : "🤍 Adaugă la favorite"}
          </button>
        </div>
      </div>
    </main>
  );
}
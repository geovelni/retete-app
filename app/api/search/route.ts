import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ error: "Lipsește query-ul" }, { status: 400 });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  const prompt = `Generează 6 rețete pentru: "${query}".
  Răspunde DOAR cu un array JSON valid, fără text suplimentar, fără markdown, fără backticks.
  Format exact:
  [
    {
      "id": "1",
      "title": "Nume rețetă",
      "description": "Descriere scurtă de 1-2 propoziții",
      "cookTime": 30,
      "difficulty": "Ușor",
      "servings": 4,
      "emoji": "🍝"
    }
  ]
  difficulty poate fi doar: Ușor, Mediu, Dificil
  cookTime e în minute (număr)`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, "").trim();
  const recipes = JSON.parse(cleaned);

  return Response.json({ recipes });
}
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || id;

  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  const prompt = `Generează o rețetă detaliată pentru: "${title}".
  Răspunde DOAR cu un obiect JSON valid, fără text suplimentar, fără markdown, fără backticks.
  Format exact:
  {
    "id": "${id}",
    "title": "Nume rețetă",
    "description": "Descriere de 2-3 propoziții",
    "cookTime": 30,
    "prepTime": 15,
    "servings": 4,
    "difficulty": "Ușor",
    "emoji": "🍝",
    "ingredients": [
      { "amount": "200", "unit": "g", "name": "paste" }
    ],
    "steps": [
      { "step": 1, "instruction": "Descriere pas" }
    ],
    "tips": "Un sfat util pentru această rețetă"
  }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```json|```/g, "").trim();
  const recipe = JSON.parse(cleaned);

  return Response.json({ recipe });
}
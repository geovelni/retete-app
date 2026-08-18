Aplicația ,,Rețetele bunicii" este concepută pentru a căuta și eventual salva ca Favorite reșete căutate de utilizator. Aplicația apelează la Gemini AI pentru a genera lista de ingrediente și etapele preparării. Aplicația returnează cartonașe cu felurile de mâncare identificate de inteligenta artificială conform cererii utilizatorului.

Cum funcționează:
Utilizatorul caută un ingredient, aplicația trimite cererea la Gemini AI și primește 6 rețete generate.
Favoritele se salvează local în browser.
     
Pentru a nu avea două componente separate: frontend și backend, next.js creează un singur proiect în care știe că file-urile de tipul page.tsx sunt cele legate d ec evede utilizatorul în Browser, iar ce le tip route.tsx (cum e cel de la calea retete-app/api/search/toute.tsx) se referă la legătura prin cheie API cu Gemini, căruia îi este explicat cum trebuie să arate un răspuns generat (prompt, continut, text).
Am folosit apoi componente. În loc să scriu un cartonaș de mai multe ori, rețin un pattern la RecipeCard care este adaptat la fiecare nouă rețetă.
     
Am folosit Tailwind pentru stilul elementelor <div className="rounded-xl p-4 shadow-sm bg-white">...</div> (aici am stabilit de exemplu sa fie colțuri rotunjite, o umbră mai mică și fundalul alb)
Am folosit shadcn/ui pentru componente vizuale (butoane și carduri) - e cod direct în proiect care poate fi modificat




# 🤖 Ritik AI – Developer & Maintenance Guide

Yeh guide aapke portfolio ke **"Ritik AI" (LangChain + Google Gemini Flash Assistant)** ke liye complete manual hai. Isme aap seekhenge ki AI kaise kaam karta hai, free API key kaise lagani hai, prompt kaise customize karna hai, aur future me naye projects/skills kaise update karne hain.

---

## 📁 Architecture Overview

```
Visitor on Website (Frontend)
       │
       ▼ (Clicks "Ask Ritik AI" & sends query)
[ Frontend: AIAssistant.jsx & api.js ]
       │
       ▼ (POST /api/ai/chat)
[ Backend: Express.js + aiRoutes.js ]
       │
       ▼
[ LangChain AI Service: aiService.js ]
       ├── 1. MongoDB Atlas (Fetches latest Projects & Profile Bio)
       ├── 2. Prompt Template & Ritik Persona
       └── 3. Google Gemini 1.5 Flash LLM (Generates accurate response & action cards)
       │
       ▼ (Returns reply + action payload)
Frontend Chat Bubble + Interactive Buttons (Download CV / WhatsApp / View Project)
```

---

## 🔑 Step 1: Free Google Gemini API Key Setup

Google Gemini API bilkul **FREE** hai aur super-fast hai.

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Apne Google account se sign-in karein.
3. **"Get API key"** par click karein aur **"Create API key in new project"** choose karein.
4. API Key copy karein.
5. Apne backend ke `.env` file (`backend/.env`) me yeh line add karein:

```env
GEMINI_API_KEY=AIzaSyYourActualApiKeyHere
```

> **Note**: Agar aapne abhi tak API key nahi dali hai, tab bhi aapka portfolio crash nahi hoga! Backend aur Frontend dono me ek intelligent fallback engine laga hua hai jo automatically common questions ka instant jawab deta hai.

---

## 🛠️ Step 2: AI Persona & Prompt Customize Kaise Karein?

AI ka prompt aur rules **`backend/services/aiService.js`** file me define hain.

Agar aap chahte hain ki AI kisi specific style me baat kare ya koi nayi information de:

1. Open karein: `backend/services/aiService.js`
2. Line `systemPromptText` dekhein:

```javascript
const systemPromptText = `
You are "Ritik AI", the official intelligent AI assistant for Ritik Varun's personal developer portfolio.
Your goal is to represent Ritik Varun professionally, enthusiastically, and accurately to recruiters, clients, and visitors.
...
`;
```

3. Aap yahan instructions badal sakte hain, jaise:
   - *"Always emphasize full-stack MERN experience"*
   - *"Offer to schedule an interview if the recruiter mentions hiring"*

---

## ⚡ Step 3: Interactive Action Buttons (Smart Trigger Tags)

LangChain AI response me automatically tags detect karta hai aur frontend par beautiful interactive buttons render karta hai:

| Action Tag | Frontend Result |
| :--- | :--- |
| `[ACTION:DOWNLOAD_CV]` | Chat ke andar **"📄 Download Resume (CV)"** button render hota hai. |
| `[ACTION:WHATSAPP]` | Chat ke andar **"💬 Chat on WhatsApp"** button render hota hai. |
| `[ACTION:EMAIL]` | Email compose link trigger hota hai. |
| `[ACTION:OPEN_URL:url:Name]` | Direct browser new tab me live demo open kar deta hai. |
| `[ACTION:NAVIGATE:path:Name]` | Portfolio ke specific page/section par navigate karta hai. |
| `[ACTION:DOWNLOAD_CV]` | Chat ke andar **"📄 Download Resume (CV)"** button render aur auto-download hota hai. |
| `[ACTION:WHATSAPP]` | Chat ke andar **"💬 Chat on WhatsApp"** button render aur auto-open hota hai. |
| `[ACTION:EMAIL]` | Email compose link trigger hota hai. |
| `[ACTION:PROJECT:ShopX]` | Projects page link render hota hai. |

---

## ✨ Step 4: Admin Panel me AI Auto-Fill Feature

Jab bhi aap Admin Panel (`/admin`) se koi naya project add karte hain:
1. Bas **Project Title** dalein (e.g. *"Crypto Tracker"* ya *"AI Video Editor"*).
2. Top par **"✨ Auto-Fill with AI"** button par click karein.
3. LangChain + Google Gemini automatically:
   - **Brief Description** (1-2 lines)
   - **Detailed Technical Breakdown** (Architecture, features, and performance)
   - **Recommended Category** (Full Stack, Frontend, AI Project, etc.)
   automatically generate karke form fill kar dega!
4. Save karne par project MongoDB me store ho jayega aur Ritik AI assistant use turant seekh lega.

---

## 🔄 Step 5: Naye Projects aur Skills Update Kaise Karein?

Aapko AI ke liye manually code change karne ki zaroorat nahi hai:

1. **Via Admin Panel**:
   - Jab bhi aap Admin Panel (`admin/`) se koi naya project add karte hain ya Settings me bio/number update karte hain, `aiService.js` dynamically MongoDB se fresh data pull karta hai.
2. **Offline/Static Fallback**:
   - Agar database offline ho, toh `backend/services/aiService.js` ke `fallbackKnowledge` object me apne naye projects aur skills add kar sakte hain.

---

## 💻 Step 6: Local Run Kaise Karein?

### 1. Backend Start Karein:
```bash
cd backend
npm run dev
```
*(Server port 5000 par run hoga)*

### 2. Frontend Start Karein:
```bash
cd frontend
npm run dev
```
*(Next.js http://localhost:3000 par run hoga)*

### 3. Admin Panel Start Karein:
```bash
cd admin
npm run dev
```
*(Vite http://localhost:5173 par run hoga)*

---

## 🚀 Step 7: Production Deployment (Render / Vercel)

1. **Backend (Render / Railway / VPS)**:
   - Environment Variables me `GEMINI_API_KEY` zaroor add karein.
   - `PORT=5000` (ya platform default).
2. **Frontend & Admin (Vercel)**:
   - Environment Variable `NEXT_PUBLIC_API_URL` ko apne live backend URL par point karein (e.g., `https://your-backend.onrender.com/api`).

---

## 🎯 Future Enhancements

1. **Job Description (JD) Matcher**: Recruiter se JD paste karwa ke % match score calculate karwana.
2. **Voice AI Input**: ShopX project ki tarah mic button se bol kar AI assistant se baat karna.
3. **MongoDB Atlas Vector Search**: Agar projects aur articles bohot zyada ho jayein toh MongoDB Vector Search index enable karna.

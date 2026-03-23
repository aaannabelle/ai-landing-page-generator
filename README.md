# ✨ AI Landing Page Generator

A web-based tool that generates polished SaaS landing pages instantly.

Create landing page headlines, subheadings, CTAs, and feature sections — then preview them live or copy the HTML code directly.

This project demonstrates a **modern, minimal, and professional UI** with a clean but playful peach/white theme and responsive layout.

> ⚠️ Note: AI integration is partially implemented. The current version uses structured fallback generation, with AI support in progress.

---

## Features

- Generate SaaS landing pages based on your idea  
- Headlines, subheadings, CTAs, and feature sections  
- Live preview of generated landing pages  
- Export HTML code for plug-and-play use  
- Prompt history to track previous ideas  
- Fallback generator if AI fails  

---

## Tech Stack

**Frontend**
- React  
- Tailwind CSS  

**Backend**
- Node.js  
- Express  

**AI**
- OpenAI (GPT-4o-mini via REST API)

**Utilities**
- fetch  
- CORS  
- dotenv  

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aaannabelle/ai-landing-generator.git
cd ai-landing-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the root folder:

```env
OPENAI_API_KEY=your_openai_api_key
```

---

### 4. Run the backend
```bash
node index.js
```

Backend runs on:
```
http://localhost:5000
```

---

### 5. Run the frontend
```bash
npm start
npm run dev
```

Open:
```
http://localhost:5173
```

---

## Usage

1. Enter your SaaS idea  
2. Click **Generate**  
3. Preview different landing page variations  
4. Click **View Code** to see HTML + Tailwind  
5. Copy and use in your own project  
6. View past prompts in **Prompt History**  

---

## Customisation

- **Theme & colors** → Edit Tailwind classes  
- **Background image** → Replace `backgroundImage` in `App.jsx`  
- **Features** → Modify fallback or AI response structure  

---

## Fallback Behaviour

If the AI API fails or returns invalid data, the app generates fallback content automatically.

This ensures the app **always works and never breaks**.

---

## License

MIT License — free to use, modify, and share.

---

## Next Steps

- Add custom hero images  
- Integrate real icons / illustrations  
- Deploy to Vercel or Netlify  
- Export React/Tailwind components  

---

## Why this project?

This project focuses on the **intersection of UI/UX design and AI-assisted development**, showcasing:

- Component-based UI thinking  
- Prompt-driven content generation  
- Real-world SaaS design patterns  
- Clean, responsive frontend implementation  

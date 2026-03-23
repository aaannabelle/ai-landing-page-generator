# ✨ AI Landing Page Generator

A web-based tool that generates polished SaaS landing pages instantly.

Create landing page headlines, subheadings, CTAs, and feature sections — then preview them live or copy the HTML code directly.

This project demonstrates a **modern, minimal, and professional UI** with a clean but playful peach/white theme and responsive layout.

> ⚠️ Note: AI integration is partially implemented. The current version uses structured fallback generation, with AI support in progress.

---

## Overview

This project demonstrates a AI-native design workflow: you don’t just mock up pages — you generate them with AI, fully coded in React + Tailwind CSS. Perfect for rapid prototyping, brand exploration, or automated landing page generation.

Key highlights:

- AI-Powered Content & Visuals – Landing page content is generated from prompts; logos and branding can be AI-customized.
- Live Preview & Interactivity – See your page instantly with dynamic updates and reusable components.
- Component-Based Design System – Tailwind-based buttons, cards, and forms structured for scalability.
- Rapid Iteration – Generate multiple landing pages in seconds with a single input.

---

## Features

- Generate SaaS landing pages based on your idea
- Componentized design for fast iteration and style consistency.
- Headlines, subheadings, CTAs, and feature sections  
- Live preview of generated landing pages  
- Export HTML code for plug-and-play use  
- Prompt history to track previous ideas  
- Fallback generator if AI fails  

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

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
4. Enter refinement and click **Refine**
5. Click **View Code** to see HTML + Tailwind
6. Copy and use in your own project  
7. View past prompts in **Prompt History**  

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
- Generate multiple logo variations and apply auto color palettes
- Integrate real icons / illustrations  
- Add interactive micro-animations for better engagement
- Deploy to Vercel or Netlify  
- Export React/Tailwind components  
- Expand component library for fully scalable design system

---

## Why this project?

This project focuses on the **intersection of UI/UX design and AI-assisted development**, showcasing:

- Ability to bridge AI + UX + front-end code
- Component-based UI thinking  
- Prompt-driven content generation  
- Real-world SaaS design patterns  
- Clean, responsive frontend implementation  
- Rapid prototyping skills and visual judgment

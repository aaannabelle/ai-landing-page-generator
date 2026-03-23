~~~~~~~~~~~~~~~~~~~~~~~~~
AI Landing Page Generator
~~~~~~~~~~~~~~~~~~~~~~~~~


WHAT IS IT?
~~~~~~~~~~~
A web-based tool that generates polished SaaS instantly.
Create landing page headlines, subheadings, CTAs and feature sections,
then preview them live or copy the HTML code directly.

This project demonstrates a modern, minimal and professional UI with a 
clean but fun peach/ white theme and responsive layout. Ideally, it 
would be integrated with AI, but for now it plugs the input into premade 
prompts, with development into AI integration started but not completed.

FEATURES:
~~~~~~~~~
>> Generate SaaS landing pages based on your idea.
>> Headlines, subheadings, CTAs and features (title + description).
>> Live preview of generated landing pages.
>> Export HTML code for plug-and-play integration into real websites.
>> Prompt history to track previous ideas.
>> Fallback generator in case AI fails.

TECH STACK:
~~~~~~~~~~~
Frontend: React, Tailwind CSS
Backend: Node.js + Expres
AI API: OpenAI GPT-4o-mini via REST
Utilities: fetch, CORS, dotenv

GETTING STARTED:
~~~~~~~~~~~~~~~~
1. Clone the repository
    >> git clone https://github.com/aaannabelle/ai-landing-generator.git
    >> cd ai-landing-generator
2. Install dependencies
    >> npm install
3. Configure environment
    >> Create a .env file in the root folder:
        >> OPENAI_API_KEY=your_openai_api_key
4. Run the backend
    >> node index.js
    >> The backend server will run at http://localhost:5000.
5. Run the frontend
    >> npm start
    >> Open http://localhost:5173 in your browser (or whatever port your 
    React dev server uses).

USAGE:
~~~~~~
1. Enter your SaaS idea in the input field.
2. Click Generate to create multiple landing page variations.
3. Click Preview to see a full landing page.
4. Click View Code to see the HTML + Tailwind code.
5. Copy the code to use directly in your project.
6. All prompts and outputs are saved in Prompt History for reference.

CUSTOMISATION:
~~~~~~~~~~~~~~
>> Theme & colors: Modify Tailwind classes for background, buttons, and 
text colors.
>> Background image: Replace the backgroundImage URL in App.jsx with your 
own PNG/asset.
>> Features: Update features array in fallback or AI response parsing.

FALLBACK BEHAVIOUR:
~~~~~~~~~~~~~~~~~~~
If the AI API fails or returns invalid data, the app generates fallback 
landing page content automatically. This ensures the app always works and 
never breaks.

LICENSE:
~~~~~~~~
MIT License — free to use, modify, and share.

NEXT STEPS:
~~~~~~~~~~~
>> Add custom hero images for generated pages.
>> Integrate real icons or illustrations for feature sections.
>> Deploy to Vercel / Netlify for live demonstration.
>> Add export to React/Tailwind component format.
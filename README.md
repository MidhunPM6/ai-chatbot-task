# SpeakGenie – AI Voice English Tutor

**SpeakGenie** is an AI-powered English speaking and communication app for students aged 6–16. It provides real-time AI feedback, gamified lessons, and coaching to make learning fun and effective.  

---

## 📌 Features

### 1️⃣ AI Chatbot – Speak with a Tutor
- **Voice Input:** Students speak → AI listens using **Python Whisper server** for Speech-to-Text (STT).  
- **AI Response:** Gemini generates a child-friendly reply.  
- **Voice Output:** AI speaks back using **TTS** (ElevenLabs).  

**Example:**  
👧 Student: “Hi Genie, what is a noun?”  
🤖 AI: “Hello! A noun is the name of a person, place, or thing. Can you give me one?”  

---

### 2️⃣ Roleplay Mode – Real-Life Conversations
- Students practice speaking in **real-world scenarios**.  
- Predefined scenarios include:  
  - 🏫 At School  
  - 🛒 At the Store  
  - 👨‍👩‍👧 At Home  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:**  Next.js 
- **AI & Voice:**  
  - **Gemini API** – AI responses  
  - **ElevenLabs** – Speech output  
  - **Whisper (Python)** – Speech-to-Text server  
- **State Management:** React Context API  
 

---

## ⚡ Python Whisper STT Server

- A separate **Python server** handles Speech-to-Text using OpenAI Whisper.  
- The frontend sends the recorded audio file (`.webm` or `.wav`) to this server.  


# 🛡️ Mail Guardian

Your Email Protector

![Logo](assets/mail-guardian.png)

------------------------------------------------------------

## 🧠 Project Explanation

Mail Guardian was created to simplify the detection of suspicious emails.
The goal is to build an accessible, visual, and intelligent tool that helps users protect themselves from scams and spam.

The AI analyzes the email content and assigns a risk score, category, and clear summary.

------------------------------------------------------------

## 🚀 Project Overview

Mail Guardian consists of two main parts:

- Frontend: User interface (HTML, CSS, JavaScript)
- Backend: Node.js server that communicates with the Gemini API for email analysis

The frontend displays emails, their status, risk level, and summaries.  
The backend acts as a secure proxy to prevent exposing your API key.

------------------------------------------------------------

## 🧩 Project Structure

```
MailGuardian/
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── emails.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

------------------------------------------------------------

## ⚙️ Installation & Setup

1) Clone the repository
```
git clone https://github.com/your-repo/mail-guardian.git
cd mail-guardian
```
2) Install backend dependencies
```
cd backend
npm install
```
3) Create the .env file
```
Inside the backend/ folder, create a file named .env:

AI_API_KEY=your_gemini_api_key

Never commit your API key to GitHub or share it publicly.
```
4) Start the backend server
```
node server.js
```
The server will start at:
http://localhost:3000

5) Launch the frontend
```
cd frontend
python3 -m http.server 8000
```
Then open:
http://localhost:8000

------------------------------------------------------------

## 🔐 Security

- The API key is stored securely in .env and loaded using dotenv
- The frontend communicates only with the local backend
- No direct calls to the Gemini API from the browser

------------------------------------------------------------

## 🧠 Core Features
```
- Automatic email storage in localStorage
- AI-powered analysis via Gemini API
- Risk-based sorting
- Category filtering (Inbox, Scam, Promotion, Unknown, etc.)
- Individual and global Reset buttons
- Expand/collapse email view for full reading
```
------------------------------------------------------------

## 🧰 Technologies Used
```
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express, dotenv, fetch
- API: Gemini (Google Generative Language API)
```
------------------------------------------------------------

## 💡 Example API Call
```
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.AI_API_KEY,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  }
);
```
------------------------------------------------------------

## 🧩 Environment Variables
```
AI_API_KEY  → Gemini API key for email analysis
PORT        → Node.js server port (default: 3000)
```

------------------------------------------------------------

## 👥 Team

- Guillaume — Lead Developer
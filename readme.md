# 💧 Pump Selector – AI-Powered Pump Recommendation Tool

This project provides an intelligent pump selection system using a machine learning model from Hugging Face to generate pump suggestions based on flow rate, pressure, and fluid type. It has a **FastAPI backend** and a **React frontend**.

---

## 🛠️ Features

- ⚙️ FastAPI-powered backend using Hugging Face models
- 💡 AI-driven pump recommendations
- 🌐 React frontend for user interaction
- 🧪 CORS-enabled for cross-platform frontend/backend communication

---

## 📁 Project Structure

pump-selector/
├── backend/ # FastAPI backend
│ ├── main.py
│ └── requirements.txt
├── frontend/ # React frontend
│ ├── public/
│ └── src/
│ └── App.jsx
├── README.md
└── .gitignore


---

## 🚀 Getting Started

### 📦 Prerequisites

- Python 3.8+
- Node.js + npm
- Git

---

### 🔌 Backend (FastAPI)

1. Navigate to the backend directory:
   cd backend
   
Create a virtual environment and install dependencies:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Run the backend (via FastAPI):
uvicorn main:app --reload
If using Google Colab, make sure to use pyngrok to expose your FastAPI server.

🌐 Frontend (React)
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the React app:
npm start
Ensure the backend URL is correctly set in your React code (e.g., in App.jsx):
const backendUrl = "http://localhost:8000/suggest-pump"; // Or your ngrok URL

🧠 Model Info
Uses Hugging Face's hosted model:
gpt2
Ensure you use your Hugging Face token when calling the API.

🗒️ Notes
Enable CORS in FastAPI for frontend requests.

If using pyngrok, set up your authtoken:
ngrok config add-authtoken <your-token>

🧑‍💻 Author
Faiz Shaikh


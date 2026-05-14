# Skoda Pump Selector

An AI-powered web application that recommends the right pump based on operational parameters like flow rate, head, viscosity, and liquid type.

## Overview

Enter your process requirements into the form and the app queries a FastAPI backend powered by a HuggingFace language model to return a pump recommendation.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Uvicorn, Pydantic |
| AI | HuggingFace Transformers (GPT-2 / configurable) |

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Add your HuggingFace read token to `backend/main.py` where indicated.

### Frontend

```bash
cd skoda-pump-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Input Parameters

| Field | Unit | Description |
|-------|------|-------------|
| Flow Rate | m³/h | Required volumetric flow |
| Head | m | Required pressure head |
| Viscosity | cP | Fluid viscosity |
| Liquid Type | — | Type of fluid being pumped |

## Configurable AI Models

The backend supports swapping the underlying model in `main.py`:

- `gpt2` — 117M params (default, fast)
- `bigscience/bloom` — 123M params
- `google/flan-t5-large` — 780M params
- `tiiuae/falcon-7b-instruct` — 7B params

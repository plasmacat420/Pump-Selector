from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from huggingface_hub import InferenceClient
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

headers = {
    "Authorization": "Bearer INSERT_HUGGING_FACE_READ_TOKEN" #INSERT_HUGGING_FACE_READ_TOKEN
}
generator = pipeline("text-generation", model="gpt2")
# can change it to the below models
# tiiuae/falcon-7b-instruct 70 billion
# gpt2 7millon
# bigscience/bloom 123million
# google/flan-t5-large 70million


class PumpInput(BaseModel):
    flow_rate: float
    pressure: float
    fluid_type: str



@app.post("/suggest-pump")
async def suggest_pump(input: PumpInput):
    prompt = f"""
    write a story for a crow
    """
    
    try:
        result = generator(prompt, max_length=500, num_return_sequences=13)
        print(result[0]['generated_text'])
    
        return {"suggestion": result[0]['generated_text']}
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# to start the server
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
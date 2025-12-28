from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Allow the frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite's default port
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "MAC Solutions API is running!"}

@app.get("/api/tutorial/{tut_id}")
def get_tutorial(tut_id: str):
    # Security: Ensure we only open valid json files
    valid_ids = ["tut1", "tut2", "tut3", "tut4", "tut5"]
    if tut_id not in valid_ids:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    
    file_path = f"data/{tut_id}.json"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Data file missing")
        
    with open(file_path, "r") as f:
        data = json.load(f)
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

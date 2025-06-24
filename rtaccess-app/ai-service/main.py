from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai

openai.api_key = "YOUR_OPENAI_KEY"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProgramRequest(BaseModel):
    description: str

class ProgramResponse(BaseModel):
    title: str
    description: str

@app.get("/")
async def read_root():
    return {"message": "Hello from ai-service!"}


@app.post("/generate-program", response_model=ProgramResponse)
async def generate_program(req: ProgramRequest):
    try:
        # Simple prompt to generate a title and description
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a rehabilitation therapist assistant program generator.",
                },
                {
                    "role": "user",
                    "content": f"Create a program idea for {req.description}",
                },
            ],
        )
        text = completion.choices[0].message.content
        lines = text.split("\n", 1)
        title = lines[0].strip()
        description = lines[1].strip() if len(lines) > 1 else ""
        return ProgramResponse(title=title, description=description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

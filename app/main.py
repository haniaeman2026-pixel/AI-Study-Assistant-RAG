from pathlib import Path

from fastapi import (
    FastAPI,
    HTTPException
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from fastapi.staticfiles import (
    StaticFiles
)

from pydantic import (
    BaseModel,
    Field
)

from .grok import generate_answer
from .rag import RAGEngine


BASE_DIR = Path(
    __file__
).resolve().parent.parent

STATIC_DIR = BASE_DIR / "static"


app = FastAPI(
    title="AI Study Assistant - RAG",
    description=(
        "Document-grounded AI Study Assistant "
        "using embeddings, ChromaDB and Groq."
    ),
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


rag = RAGEngine()


class QuestionRequest(BaseModel):

    question: str = Field(
        ...,
        min_length=3,
        max_length=1000
    )

    top_k: int = Field(
        default=4,
        ge=1,
        le=8
    )


@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "service": "AI Study Assistant",
        "rag": rag.status()
    }


@app.post("/api/index")
def index_documents():

    try:

        result = rag.index_documents()

        return {
            "success": True,
            "message": (
                "Knowledge base built successfully."
            ),
            **result
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )


@app.post("/api/ask")
def ask_question(
    request: QuestionRequest
):

    try:

        contexts = rag.retrieve(
            request.question,
            request.top_k
        )

        answer = generate_answer(
            request.question,
            contexts
        )

        sources = [

            {
                "file": item["source"],
                "chunk": item["chunk_index"],
                "distance": round(
                    float(item["distance"]),
                    4
                )
            }

            for item in contexts
        ]

        return {
            "success": True,
            "question": request.question,
            "answer": answer,
            "sources": sources
        }

    except ValueError as exc:

        raise HTTPException(
            status_code=400,
            detail=str(exc)
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )


app.mount(
    "/",
    StaticFiles(
        directory=str(STATIC_DIR),
        html=True
    ),
    name="static"
)
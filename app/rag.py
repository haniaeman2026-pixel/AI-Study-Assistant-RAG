from pathlib import Path
from typing import Dict, List

import chromadb

from .embeddings import create_embeddings
from .pdf_processor import (
    build_chunks,
    load_documents
)


BASE_DIR = Path(__file__).resolve().parent.parent

CHROMA_DIR = BASE_DIR / "chroma_db"

COLLECTION_NAME = "python_study_material"


class RAGEngine:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path=str(CHROMA_DIR)
        )

        self.collection = (
            self.client.get_or_create_collection(
                name=COLLECTION_NAME,
                metadata={
                    "hnsw:space": "cosine"
                }
            )
        )

    def clear_collection(self):

        try:
            self.client.delete_collection(
                COLLECTION_NAME
            )
        except Exception:
            pass

        self.collection = (
            self.client.get_or_create_collection(
                name=COLLECTION_NAME,
                metadata={
                    "hnsw:space": "cosine"
                }
            )
        )

    def index_documents(self) -> Dict:

        documents = load_documents()

        if not documents:
            raise ValueError(
                "No readable PDF files were found "
                "inside the data folder."
            )

        chunks = build_chunks(
            documents
        )

        if not chunks:
            raise ValueError(
                "PDF files were found, but "
                "no text could be extracted."
            )

        # Rebuild database
        self.clear_collection()

        texts = [
            item["text"]
            for item in chunks
        ]

        embeddings = create_embeddings(
            texts
        )

        ids = [
            f"chunk-{i}"
            for i in range(len(chunks))
        ]

        metadatas = [
            {
                "source": item["source"],
                "chunk_index": item["chunk_index"]
            }
            for item in chunks
        ]

        self.collection.add(
            ids=ids,
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas
        )

        return {
            "documents": len(documents),
            "chunks": len(chunks),
            "collection": COLLECTION_NAME
        }

    def retrieve(
        self,
        query: str,
        top_k: int = 4
    ) -> List[Dict]:

        if self.collection.count() == 0:

            raise ValueError(
                "Knowledge base is empty. "
                "Build the knowledge base first."
            )

        query_embedding = create_embeddings(
            [query]
        )[0]

        result = self.collection.query(
            query_embeddings=[
                query_embedding
            ],
            n_results=min(
                top_k,
                self.collection.count()
            ),
            include=[
                "documents",
                "metadatas",
                "distances"
            ]
        )

        documents = result.get(
            "documents",
            [[]]
        )[0]

        metadatas = result.get(
            "metadatas",
            [[]]
        )[0]

        distances = result.get(
            "distances",
            [[]]
        )[0]

        return [
            {
                "text": document,
                "source": metadata.get(
                    "source",
                    "Unknown"
                ),
                "chunk_index": metadata.get(
                    "chunk_index",
                    -1
                ),
                "distance": distance
            }

            for document,
            metadata,
            distance

            in zip(
                documents,
                metadatas,
                distances
            )
        ]

    def status(self) -> Dict:

        count = self.collection.count()

        return {
            "collection": COLLECTION_NAME,
            "chunks": count,
            "ready": count > 0
        }
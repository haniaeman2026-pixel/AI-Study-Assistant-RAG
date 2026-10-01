from functools import lru_cache

from sentence_transformers import SentenceTransformer


EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"


@lru_cache(maxsize=1)
def get_embedding_model():
    """
    Load the embedding model once and reuse it.
    """

    return SentenceTransformer(
        EMBEDDING_MODEL_NAME
    )


def create_embeddings(
    texts: list[str]
) -> list[list[float]]:
    """
    Convert text into semantic embeddings.
    """

    model = get_embedding_model()

    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=False
    )

    return embeddings.tolist()
from pathlib import Path
from typing import List, Dict

from pypdf import PdfReader


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def extract_text_from_pdf(pdf_path: Path) -> str:
    """
    Extract text from every page of a PDF.
    Page numbers are preserved for source tracking.
    """

    reader = PdfReader(str(pdf_path))

    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text() or ""
        page_text = page_text.strip()

        if page_text:
            pages.append(
                f"[Page {page_number}]\n{page_text}"
            )

    return "\n\n".join(pages)


def load_documents() -> List[Dict]:
    """
    Load all PDF documents from the data folder.
    """

    documents = []

    pdf_files = sorted(DATA_DIR.glob("*.pdf"))

    for pdf_path in pdf_files:

        text = extract_text_from_pdf(pdf_path)

        if text.strip():

            documents.append({
                "source": pdf_path.name,
                "text": text
            })

    return documents


def chunk_text(
    text: str,
    chunk_size: int = 900,
    chunk_overlap: int = 150
) -> List[str]:
    """
    Split document text into overlapping word-based chunks.
    """

    words = text.split()

    if not words:
        return []

    chunks = []

    start = 0

    while start < len(words):

        end = min(
            start + chunk_size,
            len(words)
        )

        chunk = " ".join(
            words[start:end]
        ).strip()

        if chunk:
            chunks.append(chunk)

        if end >= len(words):
            break

        start = max(
            end - chunk_overlap,
            start + 1
        )

    return chunks


def build_chunks(
    documents: List[Dict]
) -> List[Dict]:
    """
    Convert documents into chunks while
    preserving source and chunk metadata.
    """

    records = []

    for document in documents:

        chunks = chunk_text(
            document["text"]
        )

        for index, chunk in enumerate(chunks):

            records.append({
                "text": chunk,
                "source": document["source"],
                "chunk_index": index
            })

    return records
import os
from typing import List, Dict

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


GROQ_MODEL = os.getenv(
    "GROQ_MODEL",
    "openai/gpt-oss-20b"
)


def get_client():

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError(
            "GROQ_API_KEY is missing. "
            "Add your API key to the .env file."
        )

    return Groq(
        api_key=api_key
    )


def generate_answer(
    question: str,
    contexts: List[Dict]
) -> str:

    client = get_client()

    formatted_context = "\n\n".join(
        f"Source: {item['source']}\n"
        f"{item['text']}"
        for item in contexts
    )

    system_prompt = """
You are an AI Study Assistant.

Answer the student's question using ONLY
the supplied study context.

Do not invent information that is not
supported by the context.

If the context does not contain enough
information, say:

"I couldn't find enough information
in the uploaded study material."

Keep answers clear, educational,
accurate, and concise.

Mention the relevant source file
when useful.
"""

    user_prompt = f"""
Study Context:

{formatted_context}


Student Question:

{question}
"""

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        temperature=0.2,
        max_tokens=700,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    return response.choices[0].message.content.strip()
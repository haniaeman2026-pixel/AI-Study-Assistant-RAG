# ✦ AI Study Assistant — RAG

<div align="center">

<h1>AI Study Assistant</h1>

<p>
<b>Retrieval-Augmented Generation based learning assistant for Python study material.</b>
</p>

<p>
📚 PDF Knowledge Base &nbsp; • &nbsp;
🔎 Semantic Search &nbsp; • &nbsp;
🧠 RAG &nbsp; • &nbsp;
⚡ FastAPI &nbsp; • &nbsp;
🤖 Groq
</p>

</div>

---

## 🌟 Overview

**AI Study Assistant** is a Retrieval-Augmented Generation (RAG) based web application designed to answer questions from a collection of Python study materials.

Instead of generating answers only from general model knowledge, the application first searches the uploaded PDF study material, retrieves the most relevant content, and then provides that context to the language model.

This allows the assistant to generate answers that are grounded in the project's own study material.

---

## 🚀 What This Project Does

The application follows this workflow:

``
Python Study PDFs
       ↓
PDF Text Extraction
       ↓
Text Chunking
       ↓
Sentence Transformer Embeddings
       ↓
ChromaDB Vector Database
       ↓
Semantic Search
       ↓
Relevant Study Context
       ↓
Groq LLM
       ↓
AI Answer

The system therefore combines document retrieval + semantic search + LLM generation into one study assistant.

✨ Features
📚 Uses PDF files as the knowledge base
🔎 Semantic similarity search
🧩 Automatic text chunking
🧠 Sentence Transformer embeddings
🗄️ Persistent ChromaDB vector database
🤖 Groq-powered response generation
⚡ FastAPI backend
🌐 Responsive web interface
📄 Source-aware document retrieval
🔐 API key stored through environment variables
🛑 Answers are generated using retrieved study context
📖 Included Study Material

The current knowledge base contains five Python chapters:

Chapter 01

Introduction to Python

Chapter 02

Variables and Data Types

Chapter 03

Conditional Statements

Chapter 04

Loops

Chapter 05

Functions

These documents are stored inside the project's data/ directory.

🏗️ Project Structure
AI-Study-Assistant-RAG/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── pdf_processor.py
│   ├── embeddings.py
│   ├── rag.py
│   └── grok.py
│
├── data/
│   ├── chapter1_introduction_to_python.pdf
│   ├── chapter2_variables_and_data_types.pdf
│   ├── chapter3_conditional_statements.pdf
│   ├── chapter4_loops.pdf
│   └── chapter5_functions.pdf
│
├── chroma_db/
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── requirements.txt
└── README.md

🧠 RAG Architecture

The application uses a complete Retrieval-Augmented Generation pipeline.

1. PDF Processing

PDF documents are loaded from the data/ directory.

The application extracts text page-by-page and keeps page information with the extracted content.

2. Text Chunking

Large documents are divided into smaller overlapping chunks.

This makes it easier to retrieve the most relevant section when a user asks a question.

3. Embeddings

Each text chunk is converted into a numerical vector using:

SentenceTransformer
all-MiniLM-L6-v2

These embeddings represent the semantic meaning of the text.

4. Vector Storage

The generated embeddings are stored in:

ChromaDB

The project uses cosine similarity for semantic retrieval.

5. Retrieval

When the user asks a question, the query is converted into an embedding and compared with the stored document embeddings.

The most relevant study material is retrieved.

6. Generation

The retrieved context is passed to the Groq language model.

The model then generates the final response using the retrieved study material.

🛠️ Technologies Used

Technology	Purpose
Python	Core programming language
FastAPI	Backend API
ChromaDB	Vector database
Sentence Transformers	Text embeddings
Groq	LLM response generation
PyPDF	PDF text extraction
HTML	Frontend structure
CSS	Frontend styling
JavaScript	Frontend interaction
python-dotenv	Environment configuration
⚙️ Installation
1. Clone the Repository
git clone https://github.com/haniaeman2026-pixel/AI-Study-Assistant-RAG.git

Move into the project:

cd AI-Study-Assistant-RAG
2. Create a Virtual Environment
python -m venv venv

Activate it on Windows:

venv\Scripts\activate
3. Install Dependencies
pip install -r requirements.txt

🔑 Environment Variables

Create a .env file in the project root.

GROQ_API_KEY=YOUR_GROQ_API_KEY
GROQ_MODEL=openai/gpt-oss-20b

Never upload your actual API key to GitHub.

The .env file is excluded using .gitignore.

▶️ Run the Application

Start the FastAPI server with:

python -m uvicorn app.main:app --reload

The backend will be available at:

http://127.0.0.1:8000

Open the application in your browser.

🔄 Index the Study Material

Before asking questions, the PDF documents need to be indexed.

The indexing process:

PDF
 ↓
Extract Text
 ↓
Create Chunks
 ↓
Generate Embeddings
 ↓
Store in ChromaDB

Once indexing is completed, the knowledge base can be queried through the application.

🔌 API Endpoints
Health Check
GET /api/health

Checks whether the backend is running.

Index Documents
POST /api/index

Processes the PDFs and builds the vector knowledge base.

Ask a Question
POST /api/ask

Sends a question to the RAG pipeline and returns an AI-generated answer based on the retrieved study material.

📚 Example Questions

The assistant can be used for questions related to the included Python chapters.

Examples:

What is Python?

What are variables in Python?

What is the difference between an integer and a float?

How does an if-else statement work?

What is a for loop?

What is the purpose of a while loop?

What are functions in Python?

Why are functions useful?

The assistant retrieves relevant content from the indexed PDFs before generating the response.

🎨 Frontend

The project includes a custom frontend built with:

HTML
CSS
JavaScript

The interface is designed with a clean, modern and lightweight visual style.

It provides an interactive interface for:

indexing the study material
entering questions
receiving AI responses
interacting with the RAG assistant

The frontend communicates with the FastAPI backend through API requests.

🔐 Security

The Groq API key is stored inside .env rather than directly inside the source code.

The following files and directories are excluded from Git:

.env
venv/
__pycache__/
chroma_db/
.vscode/

This prevents sensitive configuration and local generated files from being committed to the repository.

🎯 Project Objective

The main objective of this project is to demonstrate how a Retrieval-Augmented Generation system can be used to build a study assistant that works with a controlled collection of educational documents.

The project combines:

Document Processing
        +
Embeddings
        +
Vector Search
        +
Retrieval
        +
LLM Generation

into one complete application.

🔮 Future Improvements

Possible future improvements include:

Conversation history
Multiple subject support
More document formats
Improved citation display
Authentication
User-specific knowledge bases
Advanced document filtering
Streaming AI responses
Cloud deployment
Study progress tracking
👩‍💻 Developer
<div align="center">
✦ Developed by Hania Eman ✦

AI & Data Science Student | ML Developer | Python Enthusiast

Built with curiosity, experimentation and a focus on practical AI development.

</div>
<div align="center">
✦ AI Study Assistant ✦

Learn • Retrieve • Understand • Build

</div> ```

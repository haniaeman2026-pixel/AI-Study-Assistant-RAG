<!-- ═══════════════════════════════════════════════════════════════ -->
<!--                    AI STUDY ASSISTANT RAG                     -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div align="center">

<img 
src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=700&size=36&duration=3000&pause=900&color=2E7D5B&center=true&vCenter=true&width=760&height=70&lines=AI+Study+Assistant;Retrieval-Augmented+Generation;Learn.+Retrieve.+Understand."
alt="AI Study Assistant - Animated Title"
/>

<br>

<p>
  <strong>📚 AI-powered study assistant built with Retrieval-Augmented Generation</strong>
</p>

<p>
  Search your study material • Retrieve relevant context • Generate grounded answers
</p>

<br>

<img src="https://img.shields.io/badge/Python-2E7D5B?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-3F8F6B?style=for-the-badge&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/ChromaDB-5E9F7A?style=for-the-badge&logoColor=white"/>
<img src="https://img.shields.io/badge/Groq-276749?style=for-the-badge&logoColor=white"/>

<br><br>

<a href="#-run-the-application">
  <img 
    src="https://img.shields.io/badge/✦%20RUN%20LOCALLY-2E7D5B?style=for-the-badge&labelColor=276749"
    alt="Run Locally"
  />
</a>

</div>

<br>

---

## ✦ About The Project

**AI Study Assistant** is a Retrieval-Augmented Generation (**RAG**) application designed to answer questions from a collection of Python study materials.

Instead of relying only on the language model's general knowledge, the system first searches the project's indexed study material, retrieves relevant information, and then provides that context to the AI model.

This creates a study assistant whose responses are grounded in the project's own learning resources.

---

## ✦ How It Works

<div align="center">

``
┌───────────────────────┐
│     Python PDFs       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   PDF Text Extraction │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│    Text Chunking      │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Sentence Transformers │
│      Embeddings       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│       ChromaDB        │
│    Vector Storage     │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   Semantic Retrieval  │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│       Groq LLM        │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│      AI Response      │
└───────────────────────┘
</div>
✦ Key Features
<table> <tr> <td width="50%">
📚 Document Based

Uses Python PDF study material as the application's knowledge base.

</td> <td width="50%">
🔎 Semantic Search

Retrieves relevant content based on meaning rather than simple keyword matching.

</td> </tr> <tr> <td>
🧠 RAG Pipeline

Combines retrieval with LLM-based response generation.

</td> <td>
⚡ FastAPI Backend

Provides a lightweight API layer for the application.

</td> </tr> <tr> <td>
🗄️ ChromaDB

Stores and searches document embeddings using vector similarity.

</td> <td>
🤖 Groq LLM

Generates responses using the retrieved study context.

</td> </tr> </table>
✦ Study Material

The current knowledge base contains five Python chapters:

Chapter	Topic
01	Introduction to Python
02	Variables and Data Types
03	Conditional Statements
04	Loops
05	Functions

All study documents are placed inside:

data/
✦ Technology Stack
<div align="center">
Technology	Role
🐍 Python	Core programming language
⚡ FastAPI	Backend API
🧠 Sentence Transformers	Text embeddings
🗄️ ChromaDB	Vector database
🤖 Groq	LLM response generation
📄 PyPDF	PDF text extraction
🌐 HTML	Frontend structure
🎨 CSS	Frontend styling
⚙️ JavaScript	Frontend interaction
🔐 python-dotenv	Environment configuration
</div>
✦ Project Structure
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
✦ RAG Pipeline
01 — PDF Processing

The application loads PDF documents from the data directory and extracts their text page by page.

02 — Chunking

Extracted content is divided into smaller overlapping chunks so that relevant information can be retrieved efficiently.

03 — Embeddings

Each chunk is converted into a numerical representation using:

SentenceTransformer
all-MiniLM-L6-v2
04 — Vector Database

The embeddings are stored in ChromaDB for semantic similarity search.

05 — Retrieval

When a user submits a question, the question is embedded and compared with the stored document vectors.

The most relevant study content is retrieved.

06 — Generation

The retrieved context is provided to the Groq LLM, which generates the final response based on the available study material.

✦ Installation
01 — Clone the Repository
git clone https://github.com/haniaeman2026-pixel/AI-Study-Assistant-RAG.git
cd AI-Study-Assistant-RAG
02 — Create Virtual Environment
python -m venv venv
03 — Activate Environment

Windows PowerShell:

venv\Scripts\activate
04 — Install Dependencies
pip install -r requirements.txt
✦ Environment Configuration

Create a .env file in the project root:

GROQ_API_KEY=YOUR_GROQ_API_KEY
GROQ_MODEL=openai/gpt-oss-20b

⚠️ Never expose your real API key in GitHub.

The .env file is excluded through .gitignore.

✦ Run The Application

Follow these steps to run the AI Study Assistant locally.

01 — Start the FastAPI Server
python -m uvicorn app.main:app --reload
02 — Open the Application

Once the server starts, open:

http://127.0.0.1:8000

or:

http://localhost:8000

The AI Study Assistant frontend will open in your browser.

03 — Index the Study Material

Before asking questions, index the PDF study material through the application.

The indexing process will:

PDF Files
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Embeddings
    ↓
ChromaDB
    ↓
Searchable Knowledge Base

Once indexing is complete, you can start asking questions from the available Python study material.

💡 Note: This project currently runs locally. A public Live Demo is not available yet because the application has not been deployed online.

✦ API Endpoints
Health Check
GET /api/health

Checks whether the backend is running.

Index Study Material
POST /api/index

Processes the PDF documents and creates the vector knowledge base.

Ask Question
POST /api/ask

Retrieves relevant study material and generates an AI response.

✦ Example Questions

The assistant can answer questions related to the indexed Python chapters.

What is Python?

What are variables in Python?

What is the difference between integers and floats?

How does an if-else statement work?

What is a for loop?

What is a while loop?

What are functions in Python?

Why are functions useful?
✦ Frontend

The project includes a custom frontend built with:

HTML
CSS
JavaScript

The interface provides a clean and interactive environment for communicating with the RAG backend.

The frontend communicates with the FastAPI application through API requests.

✦ Security

Sensitive configuration is kept outside the source code.

The following are excluded from Git:

.env
venv/
__pycache__/
*.pyc
chroma_db/
.vscode/

This keeps API credentials and local generated files out of the repository.

✦ Project Objective

The purpose of this project is to demonstrate a complete Retrieval-Augmented Generation workflow using educational documents.

The project brings together:

PDF Processing
      +
Text Chunking
      +
Embeddings
      +
Vector Search
      +
Context Retrieval
      +
LLM Generation

to create an interactive AI-powered study assistant.

<br> <div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=600&size=28&duration=2800&pause=900&color=2E7D5B&center=true&vCenter=true&width=720&height=60&lines=Developed+by+Hania+Eman;AI+%26+Data+Science+Student;ML+Developer+%7C+Python+Enthusiast;Building+with+AI+%26+Python" alt="Developed by Hania Eman - Animated" />

<br><br>

<p> <strong>AI & Data Science Student</strong> <br> <span>ML Developer &nbsp;|&nbsp; Python Enthusiast</span> </p> <br> <p> <sub>✦ Learn • Retrieve • Understand • Build ✦</sub> </p> </div>
<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=600&size=20&duration=3000&pause=1000&color=3F8F6B&center=true&vCenter=true&width=520&height=45&lines=AI+Study+Assistant+—+RAG;Built+for+learning.+Powered+by+retrieval." alt="Animated Closing Text" />

</div> ```

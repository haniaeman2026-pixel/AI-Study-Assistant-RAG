/* =====================================================
   AI STUDY ASSISTANT
   Frontend Controller
   ===================================================== */


/* ================= ELEMENTS ================= */

const messages =
    document.getElementById("messages");

const questionForm =
    document.getElementById("questionForm");

const questionInput =
    document.getElementById("question");

const askBtn =
    document.getElementById("askBtn");

const buildBtn =
    document.getElementById("buildBtn");

const knowledgeBuildBtn =
    document.getElementById(
        "knowledgeBuildBtn"
    );

const statusBadge =
    document.getElementById(
        "statusBadge"
    );

const documentCount =
    document.getElementById(
        "documentCount"
    );

const pdfCount =
    document.getElementById(
        "pdfCount"
    );

const documentList =
    document.getElementById(
        "documentList"
    );

const fullDocumentList =
    document.getElementById(
        "fullDocumentList"
    );

const documentSearch =
    document.getElementById(
        "documentSearch"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

const settingsThemeBtn =
    document.getElementById(
        "settingsThemeBtn"
    );

const settingsClearBtn =
    document.getElementById(
        "settingsClearBtn"
    );

const topK =
    document.getElementById(
        "topK"
    );

const toast =
    document.getElementById(
        "toast"
    );

const knowledgeStatusText =
    document.getElementById(
        "knowledgeStatusText"
    );

const statDocuments =
    document.getElementById(
        "statDocuments"
    );

const statChunks =
    document.getElementById(
        "statChunks"
    );


/* ================= DOCUMENTS ================= */

const documents = [

    {
        name:
            "Chapter 1 - Introduction to Python",

        file:
            "chapter1_introduction_to_python.pdf"
    },

    {
        name:
            "Chapter 2 - Variables and Data Types",

        file:
            "chapter2_variables_and_data_types.pdf"
    },

    {
        name:
            "Chapter 3 - Conditional Statements",

        file:
            "chapter3_conditional_statements.pdf"
    },

    {
        name:
            "Chapter 4 - Loops",

        file:
            "chapter4_loops.pdf"
    },

    {
        name:
            "Chapter 5 - Functions",

        file:
            "chapter5_functions.pdf"
    }

];


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);
}


/* ================= DOCUMENT RENDER ================= */

function renderDocuments(
    filter = ""
) {

    const filtered =
        documents.filter(
            doc =>
                doc.name
                    .toLowerCase()
                    .includes(
                        filter
                            .toLowerCase()
                    )
        );


    documentList.innerHTML = "";


    filtered.forEach(
        doc => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "document-item";


            item.innerHTML = `

                <div class="document-icon">
                    📄
                </div>

                <div class="document-name">
                    ${doc.name}
                </div>

                <div class="check">
                    ✓
                </div>

            `;


            documentList.appendChild(
                item
            );

        }
    );


    fullDocumentList.innerHTML = "";


    filtered.forEach(
        doc => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "full-document-card";


            card.innerHTML = `

                <div class="doc-icon">
                    📄
                </div>

                <div>

                    <h3>
                        ${doc.name}
                    </h3>

                    <p>
                        ${doc.file}
                    </p>

                </div>

            `;


            fullDocumentList.appendChild(
                card
            );

        }
    );


    pdfCount.textContent =
        `${documents.length} PDFs`;

}


renderDocuments();


/* ================= NAVIGATION ================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const sections =
    document.querySelectorAll(
        ".content-section"
    );


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                const target =
                    item.dataset.section;


                navItems.forEach(
                    nav =>
                        nav.classList.remove(
                            "active"
                        )
                );


                item.classList.add(
                    "active"
                );


                sections.forEach(
                    section =>
                        section.classList.remove(
                            "active-section"
                        )
                );


                document
                    .getElementById(target)
                    .classList.add(
                        "active-section"
                    );

            }
        );

    }
);


/* ================= ADD MESSAGE ================= */

function addMessage(
    type,
    text,
    sources = []
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `message ${type}`;


    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        `message-avatar ${
            type === "user"
                ? "user-avatar"
                : "ai-avatar"
        }`;


    avatar.textContent =
        type === "user"
            ? "You"
            : "AI";


    const body =
        document.createElement(
            "div"
        );


    body.className =
        "message-body";


    const textElement =
        document.createElement(
            "div"
        );


    textElement.className =
        "message-text";


    textElement.textContent =
        text;


    body.appendChild(
        textElement
    );


    if (
        sources &&
        sources.length
    ) {

        const sourceBox =
            document.createElement(
                "div"
            );


        sourceBox.className =
            "source-list";


        const uniqueFiles =
            [
                ...new Set(
                    sources.map(
                        source =>
                            source.file
                    )
                )
            ];


        sourceBox.textContent =
            "📚 Sources: " +
            uniqueFiles.join(
                ", "
            );


        body.appendChild(
            sourceBox
        );

    }


    message.appendChild(
        avatar
    );

    message.appendChild(
        body
    );


    messages.appendChild(
        message
    );


    messages.scrollTop =
        messages.scrollHeight;

}


/* ================= CLEAR CHAT ================= */

function clearChat() {

    messages.innerHTML = "";


    addMessage(
        "assistant",
        "Chat cleared. Ask a new question whenever you are ready."
    );


    showToast(
        "Chat cleared"
    );

}


settingsClearBtn.addEventListener(
    "click",
    clearChat
);


/* ================= ASK QUESTION ================= */

questionForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const question =
            questionInput.value.trim();


        if (!question) {

            showToast(
                "Please enter a question."
            );

            return;

        }


        addMessage(
            "user",
            question
        );


        questionInput.value =
            "";


        askBtn.disabled =
            true;


        askBtn.textContent =
            "...";


        const loading =
            document.createElement(
                "div"
            );


        loading.className =
            "message";


        loading.innerHTML = `

            <div class="message-avatar ai-avatar">
                AI
            </div>

            <div class="message-body">

                <div class="message-text">
                    Thinking...
                </div>

            </div>

        `;


        messages.appendChild(
            loading
        );


        messages.scrollTop =
            messages.scrollHeight;


        try {

            const response =
                await fetch(
                    "/api/ask",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                question:
                                    question,

                                top_k:
                                    Number(
                                        topK.value
                                    )

                            })
                    }
                );


            const data =
                await response.json();


            loading.remove();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to answer the question."
                );

            }


            addMessage(
                "assistant",
                data.answer,
                data.sources || []
            );


        } catch (error) {

            loading.remove();


            addMessage(
                "assistant",
                `Error: ${error.message}`
            );


            showToast(
                "Could not get an answer"
            );

        } finally {

            askBtn.disabled =
                false;

            askBtn.textContent =
                "➤";

        }

    }
);


/* ================= SUGGESTIONS ================= */

document
    .querySelectorAll(
        ".suggestion"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    questionInput.value =
                        button.textContent.trim();

                    questionInput.focus();

                }
            );

        }
    );


/* ================= BUILD KNOWLEDGE BASE ================= */

async function buildKnowledgeBase() {

    buildBtn.disabled =
        true;

    knowledgeBuildBtn.disabled =
        true;


    buildBtn.textContent =
        "Building...";


    knowledgeBuildBtn.textContent =
        "Building Knowledge Base...";


    statusBadge.textContent =
        "Building";

    statusBadge.classList.remove(
        "offline"
    );


    knowledgeStatusText.textContent =
        "Reading PDFs, creating chunks and generating embeddings...";


    try {

        const response =
            await fetch(
                "/api/index",
                {
                    method:
                        "POST"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Knowledge base build failed."
            );

        }


        showToast(
            "Knowledge base built successfully!"
        );


        addMessage(
            "assistant",
            `Knowledge base is ready. I indexed ${data.documents} PDF documents into ${data.chunks} semantic chunks. You can now ask questions.`
        );


        await refreshStatus();


    } catch (error) {

        statusBadge.textContent =
            "Error";


        statusBadge.classList.add(
            "offline"
        );


        knowledgeStatusText.textContent =
            error.message;


        showToast(
            "Knowledge base build failed"
        );


        addMessage(
            "assistant",
            `Indexing error: ${error.message}`
        );

    } finally {

        buildBtn.disabled =
            false;

        knowledgeBuildBtn.disabled =
            false;

        buildBtn.textContent =
            "↻  Rebuild Knowledge Base";

        knowledgeBuildBtn.textContent =
            "Build / Rebuild Knowledge Base";

    }

}


buildBtn.addEventListener(
    "click",
    buildKnowledgeBase
);


knowledgeBuildBtn.addEventListener(
    "click",
    buildKnowledgeBase
);


/* ================= STATUS ================= */

async function refreshStatus() {

    try {

        const response =
            await fetch(
                "/api/health"
            );


        const data =
            await response.json();


        const rag =
            data.rag;


        if (rag.ready) {

            statusBadge.textContent =
                "Active";


            statusBadge.classList.remove(
                "offline"
            );


            documentCount.textContent =
                `${documents.length} documents indexed`;


            knowledgeStatusText.textContent =
                `${documents.length} documents are available with ${rag.chunks} indexed chunks.`;


            statDocuments.textContent =
                documents.length;


            statChunks.textContent =
                rag.chunks;

        } else {

            statusBadge.textContent =
                "Not Built";


            documentCount.textContent =
                "Knowledge base not built";


            knowledgeStatusText.textContent =
                "Build the knowledge base to enable AI question answering.";


            statDocuments.textContent =
                "0";


            statChunks.textContent =
                "0";

        }

    } catch (error) {

        statusBadge.textContent =
            "Offline";


        statusBadge.classList.add(
            "offline"
        );


        documentCount.textContent =
            "Backend unavailable";


        knowledgeStatusText.textContent =
            "Could not connect to the FastAPI backend.";

    }

}


/* ================= DOCUMENT SEARCH ================= */

documentSearch.addEventListener(
    "input",
    () => {

        renderDocuments(
            documentSearch.value
        );

    }
);


/* ================= THEME ================= */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "studyTheme",
        isDark
            ? "dark"
            : "light"
    );


    themeBtn.textContent =
        isDark
            ? "☾"
            : "☀";

}


themeBtn.addEventListener(
    "click",
    toggleTheme
);


settingsThemeBtn.addEventListener(
    "click",
    toggleTheme
);


/* ================= LOAD THEME ================= */

const savedTheme =
    localStorage.getItem(
        "studyTheme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☾";

}


/* ================= ENTER KEY ================= */

questionInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            questionForm.requestSubmit();

        }

    }
);


/* ================= START ================= */

refreshStatus();
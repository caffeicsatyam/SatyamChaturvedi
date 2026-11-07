// js/data.js: Project Specifications and Modal Payloads

export const PROFILE_CONFIG = {
  email: "satyamchaturvedibbk@gmail.com"
};

export const PROJECTS_DATA = {
  cfobuddy: {
    title: "CFOBuddy: Agentic Financial Co-Pilot",
    desc: "Multi-agent orchestration platform engineered for CFO workflows. Ingests balance sheets, cash flow statements, and income ledgers, routing analytical queries through semantic embedding heuristics and an autonomous Text-to-SQL engine.",
    tech: "FastAPI · Next.js · LangGraph · LlamaIndex · PostgreSQL (PGVector) · Groq",
    github: "https://github.com/caffeicsatyam/cfobuddy",
    highlights: [
      "Deterministic Routing: Employs semantic embedding heuristics to route user intents between relational SQL aggregation and unstructured vector retrieval.",
      "Autonomous Text-to-SQL Engine: Generates, introspects schema, validates, and executes read-only PostgreSQL queries with automatic retry guardrails, reaching 92% accuracy.",
      "Multi-Agent Reconciliation: Coordinates 4 specialized LangGraph nodes to cross-verify balance sheet and cash flow variances before rendering interactive visualizations.",
      "Sub-Second Inference: Replaced LLM-based routing with lightweight semantic fallback, reducing response latency to 200ms."
    ]
  },
  radiology: {
    title: "Radiology Reporting Assistant: Template-Aware Clinical LLM",
    desc: "Supervised fine-tuning pipeline adapting Qwen2.5-3B-Instruct using QLoRA to transform unstructured radiology dictations into structured, template-aligned clinical reports.",
    tech: "Python · PyTorch · Hugging Face Transformers · Qwen2.5-3B · PEFT / QLoRA · TRL · Gradio",
    github: "https://github.com/caffeicsatyam/radiology-reporting-harness",
    highlights: [
      "Parameter-Efficient Fine-Tuning: Fine-tuned with QLoRA and supervised fine-tuning (SFT) for clinical dictation alignment on consumer GPUs.",
      "Comparative Evaluation Pipeline: Benchmarked against copy-template baselines across 95 clinical test cases, achieving 54.99% reduction in mean Radiology Edit Score (RES).",
      "Rigorous Error Analysis: Recorded lower RES than baseline on 81 of 95 cases (85.3%) with 56.27% lower findings score and 53.09% lower impression score.",
      "Published Model Weights: Hosted model weights on Hugging Face Hub with interactive Gradio evaluation suite."
    ]
  },
  assessq: {
    title: "AssessQ: Assessment Recommendation Engine",
    desc: "Hybrid retrieval platform combining sparse lexical search with dense vector embeddings and Reciprocal Rank Fusion (RRF) for technical competency catalogs.",
    tech: "Python · ChromaDB · Sentence-Transformers · LangChain · Streamlit",
    github: "https://github.com/caffeicsatyam/AssessQ",
    highlights: [
      "Hybrid Retrieval Pipeline: Combines BM25 lexical keyword matching with dense sentence-transformers to capture exact technical skills alongside semantic intent.",
      "Reciprocal Rank Fusion (RRF): Evaluated 4 retrieval configurations across 30 domain queries, achieving 0.90 Recall@5.",
      "Domain Filtering: Normalizes heterogeneous technical rubrics into structured competency vectors for candidate evaluation."
    ]
  }
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Explorer', href: '#architecture' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Contact', href: '#contact' }
] as const;

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Accessibility']
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'REST APIs', 'Authentication', 'Databases', 'Product thinking']
  },
  {
    category: 'AI & Automation',
    items: ['Workflow automation', 'Python', 'Data pipelines', 'Problem solving']
  },
  {
    category: 'Tooling & Design',
    items: ['Figma', 'Git', 'GitHub', 'Vercel', 'Motion design', 'System design']
  }
] as const;

export const projects = [
  {
    title: 'Context-Surgeon',
    visualSrc: '/project-art/context-surgeon-flow.svg',
    visualAlt:
      'Context compression flow preserving the system prompt and query while selecting context, counting tokens, and auditing markers for restoration.',
    label: 'Token-aware context compression toolkit',
    status: 'Source available',
    solutionType: 'Repository implementation',
    problem:
      'Long context can consume a large token budget, while aggressive compression risks changing system instructions, the active query, or explicitly marked content.',
    objective:
      'Reduce eligible context using target-model token counts while keeping system instructions and the active query unchanged.',
    solution:
      'A Python library and Streamlit dashboard use tiktoken counts to select and compress context, report preservation checks, and restore the original when required markers would be lost. Answer-quality evaluation against an OpenAI-compatible provider is optional.',
    architecture:
      'Immutable system prompt and query → target-model token counting → selective context compression → explicit-marker preservation audit and conditional restoration. Optional answer evaluation is a separate provider-backed step.',
    technologies: ['Python', 'Streamlit', 'tiktoken', 'pytest', 'python-dotenv'],
    role:
      'This summary is based on the published README, implementation modules, configuration, and tests; no external performance or user-study claims are made.',
    challenge:
      'Reduce eligible context without rewriting instructions or silently dropping explicitly marked information.',
    evidence:
      'The public repository contains the Streamlit app, Python package modules for tokenization, context selection, and preservation, a compression test suite, and a benchmark module. Optional answer-quality evaluation requires a configured provider.',
    futureScope:
      'Publish representative benchmark results and evaluate answer quality across more models and context types; no performance or semantic-equivalence claim is made here.',
    architectureSteps: [
      {
        label: 'Keep instructions immutable',
        detail: 'The system-prompt and active-query modules return their inputs unchanged; compression operates on context instead.',
        technologies: ['Python']
      },
      {
        label: 'Count target-model tokens',
        detail: 'The tokenizer uses tiktoken with a selected model encoding to measure the input against a token budget.',
        technologies: ['tiktoken']
      },
      {
        label: 'Select context',
        detail: 'The compressor deduplicates and ranks eligible context while keeping the configured token target in view.',
        technologies: ['Python', 'tiktoken']
      },
      {
        label: 'Audit preservation',
        detail: 'Explicit marker coverage is checked after compression; the original context is restored if required markers are missing. Provider-backed answer evaluation is optional.',
        technologies: ['Python', 'pytest']
      }
    ],
    technicalDecision:
      'Keep the system prompt and active query immutable, and restore the original context if compression would lose required explicit markers.',
    statusDetail:
      'The public repository contains the Python package, Streamlit dashboard, tests, and benchmark code. No deployed demo or independently verified performance results were supplied.',
    sourceInspected: true,
    githubUrl: 'https://github.com/yashgautam1205-code/Context-Surgeon',
    demoUrl: null,
    screenshots: []
  },
  {
    title: 'NPC',
    visualSrc: '/project-art/npc-memory-loop.svg',
    visualAlt:
      'Player input flows through intent to an NPC persona informed by persistent state and memories, producing contextual dialogue.',
    label: 'Stateful conversational NPC simulation',
    status: 'Source available',
    solutionType: 'Repository implementation',
    problem:
      'Game characters can feel disconnected when dialogue does not reflect previous interactions, player intent, or changes in the relationship.',
    objective:
      'Build an interactive RPG scene where NPC responses use stored conversation context and relationship state.',
    solution:
      'The React frontend renders a Three.js world with a Phaser 2D switch. A Flask backend classifies player intent, combines mood, facts, behavior rules, and stored memories into character prompts, then calls a configurable Ollama-compatible chat-completions endpoint. A developer panel and NPC-to-NPC dialogue route are also present.',
    architecture:
      'React world with Three.js / Phaser fallback → Flask chat API → PyTorch intent classification, SQLite relationship/fact state, and ChromaDB semantic memory → persona prompt → configurable Ollama-compatible chat-completions endpoint.',
    technologies: ['React', 'Three.js', 'Phaser', 'Flask', 'SQLite', 'ChromaDB', 'Sentence Transformers', 'PyTorch'],
    role:
      'This summary is based on the published README, frontend, backend, and configuration; no external performance or user-study claims are made.',
    challenge:
      'Carry conversational context and relationship signals across turns without losing each NPC’s defined persona.',
    evidence:
      'The public repository contains the React/Vite frontend, Three.js world and Phaser fallback, Flask API, SQLite relationship and fact state, ChromaDB-backed memory modules, PyTorch intent-classifier code, and genuine project screenshots. The portfolio card uses a locally designed SVG instead of a repository photograph.',
    futureScope:
      'Document reproducible setup and evaluation, and test memory and dialogue behavior across NPCs and longer sessions. No response-quality or latency results are claimed.',
    architectureSteps: [
      {
        label: 'Render the game world',
        detail: 'The React app selects a Three.js world by default and includes a Phaser-based 2D mode.',
        technologies: ['React', 'Three.js', 'Phaser']
      },
      {
        label: 'Receive player dialogue',
        detail: 'The Flask chat route loads the selected NPC and classifies the player message before composing a response.',
        technologies: ['Flask', 'Python']
      },
      {
        label: 'Assemble state and memory',
        detail: 'The backend combines intent with SQLite mood, facts, and behavior rules plus stored ChromaDB memories; the intent-classifier implementation uses PyTorch.',
        technologies: ['SQLite', 'ChromaDB', 'Sentence Transformers', 'PyTorch']
      },
      {
        label: 'Build persona response',
        detail: 'A character prompt and conversation history are sent to a configurable chat-completions endpoint, which defaults to a local Ollama-compatible URL.',
        technologies: ['Flask', 'Ollama-compatible API']
      }
    ],
    technicalDecision:
      'Separate character prompting from persistent state: mood, facts, behavior rules, and retrieved memories inform each response, while the chat-completions server remains configurable.',
    statusDetail:
      'The public repository contains frontend and backend source plus screenshots. The local chat-completions server and optional saved model files are external runtime dependencies; no hosted demo was supplied.',
    sourceInspected: true,
    githubUrl: 'https://github.com/yashgautam1205-code/NPC',
    demoUrl: null,
    screenshots: []
  },
  {
    title: 'BrandGuard',
    visualSrc: '/project-art/brandguard-visual.svg',
    visualAlt:
      'Brand review illustration connecting analyzed content, a protected identity shield, visual rules, and human approval.',
    label: 'Human-reviewed brand compliance workspace',
    status: 'MVP source',
    solutionType: 'Implemented MVP',
    problem:
      'Teams need to apply approved brand rules consistently to marketing content and retain a traceable explanation and review history for findings.',
    objective:
      'Provide an organisation-scoped workflow for managing brand guidance, analysing content, and leaving decisions with human reviewers.',
    solution:
      'BrandGuard AI extracts text from guideline and content documents, lets managers approve draft rules, and checks submissions using deterministic rules and approved-rule retrieval. Gemini analysis, external claim research, and visual inspection are optional; findings and corrections stay in a human review workflow.',
    architecture:
      'Guideline/content upload → document extraction and draft rules → approved organisation-scoped rules and deterministic checks → optional AI, source, or visual analysis → evidence-linked review and audit history.',
    technologies: ['React', 'Vite', 'FastAPI', 'SQLAlchemy', 'PostgreSQL / SQLite', 'ChromaDB', 'Gemini (optional)', 'OpenCV'],
    role:
      'This entry summarizes the public CodeNexus repository. An author-specific contribution breakdown was not independently verified.',
    challenge:
      'Make policy findings traceable while ensuring AI or missing evidence is not treated as an automatic approval or a definitive factual verdict.',
    evidence:
      'The public repository includes a React/Vite SPA, FastAPI API, document extraction and compliance services, guideline retrieval, visual-analysis code, and backend/frontend tests. No runtime test, user study, or outcome measurement was performed for this portfolio update.',
    futureScope:
      'Evaluate review clarity and analysis quality with brand teams using representative documents and configured production-like services; no measured results are claimed.',
    architectureSteps: [
      {
        label: 'Upload and extract',
        detail: 'The API accepts guideline and content documents and extracts text from PDF, DOCX, and TXT files; source page or section markers are retained where available.',
        technologies: ['React', 'FastAPI', 'PyMuPDF', 'python-docx']
      },
      {
        label: 'Approve brand rules',
        detail: 'Guidelines can yield candidate rules, but those candidates remain drafts until an authorised manager approves them.',
        technologies: ['FastAPI', 'SQLAlchemy']
      },
      {
        label: 'Analyse with evidence',
        detail: 'Deterministic checks run against content; retrieval is limited to approved, organisation-scoped rules. Gemini, external claim sources, OCR, and visual analysis are optional integrations.',
        technologies: ['ChromaDB', 'Gemini (optional)', 'Tavily (optional)', 'OpenCV']
      },
      {
        label: 'Review and record',
        detail: 'Findings, evidence, suggested corrections, reviewer decisions, and audit history are persisted; the tool does not publish content automatically.',
        technologies: ['FastAPI', 'PostgreSQL / SQLite']
      }
    ],
    technicalDecision:
      'Keep rule approval and final content decisions with people; incomplete AI or source evidence is reported as partial or needing review, not as automatic rejection.',
    statusDetail:
      'MVP source is available in the public repository. Optional providers and runtime services were not exercised in this portfolio update; no live demo button is shown.',
    sourceInspected: true,
    githubUrl: 'https://github.com/yashgautam1205-code/CodeNexus',
    demoUrl: null,
    screenshots: []
  },
  {
    title: 'CHRONOS-X',
    visualSrc: '/project-art/chronos-x-visual.svg',
    visualAlt:
      'Industrial decision-support illustration with a forecast curve, connected system signals, scenario controls, and an anomaly marker; not live data.',
    label: 'Intelligent predictive decision-support project',
    status: 'Prototype direction',
    solutionType: 'Prototype direction',
    problem:
      'Static dashboards show what has happened but can leave decision-makers without a clear way to compare possible next steps when conditions change.',
    objective:
      'Explore a decision-support view that helps people compare possible futures without presenting a forecast as certainty.',
    solution:
      'A predictive decision-support direction that puts a forecast beside its assumptions and lets a user compare scenarios instead of presenting a prediction as a certainty.',
    architecture:
      'Time-series and event inputs → data-quality checks → forecast and scenario comparison → uncertainty-aware decision view. The specific model, dataset, and prototype implementation are not documented here.',
    technologies: ['Predictive modeling', 'React', 'Analytics UI', 'Data storytelling'],
    role: 'Research, interface architecture, and prototype exploration',
    challenge:
      'A forecast can appear more authoritative than its inputs warrant. The documented direction calls for visible assumptions and scenario comparison, but model behavior and data quality are unverified.',
    evidence:
      'The existing portfolio concept is the available project evidence. Repository source, model, dataset, forecast evaluation, and implementation details have not been independently verified.',
    futureScope:
      'Document a real use case and dataset, define a baseline, and test whether an uncertainty-aware scenario view helps users compare decisions before describing model performance.',
    architectureSteps: [
      {
        label: 'Time-series + events',
        detail: 'The proposed input is historical time-series and event data. No dataset, source, or schema is documented.',
        technologies: ['Predictive modeling']
      },
      {
        label: 'Data-quality checks',
        detail: 'The conceptual flow checks input quality before forecasting; validation rules and implementation are not specified.',
        technologies: ['Predictive modeling']
      },
      {
        label: 'Forecast + scenarios',
        detail: 'A forecast is compared across possible scenarios with its assumptions visible. No specific model is claimed.',
        technologies: ['Predictive modeling', 'Data storytelling']
      },
      {
        label: 'Decision view',
        detail: 'An analytics interface presents uncertainty as context for a human decision, not as a guaranteed outcome.',
        technologies: ['React', 'Analytics UI', 'Data storytelling']
      }
    ],
    technicalDecision:
      'Show assumptions and compare scenarios rather than presenting one forecast as certainty. Model choice and uncertainty calculations remain undocumented.',
    statusDetail:
      'Prototype direction only. Implementation details and any live demo have not been independently reviewed.',
    sourceInspected: false,
    githubUrl: 'https://github.com/yashgautam1205-code/Chronos-X',
    demoUrl: null,
    screenshots: []
  },
  {
    title: 'AgriTech',
    visualSrc: '/project-art/agritech-visual.svg',
    visualAlt:
      'Healthy crop leaf under a non-diagnostic scan overlay, alongside crop-context and farmer-guidance indicators.',
    label: 'AI-assisted crop disease detection concept',
    status: 'Concept',
    solutionType: 'Proposed direction',
    problem:
      'Crop symptoms can be difficult to distinguish from a photo alone, and a confident-looking but unreliable diagnosis could lead to the wrong field action.',
    objective:
      'Explore a crop-health flow that treats image classification as an uncertain aid and points toward locally reviewed guidance.',
    solution:
      'A proposed crop-health assistant that checks image quality, offers a model-assisted candidate with uncertainty, and routes the user toward locally reviewed guidance rather than treating a label as a diagnosis.',
    architecture:
      'Image capture → quality and crop-context checks → candidate classification with confidence → human-verified guidance. Dataset coverage, model validation, and agronomy review are not established.',
    technologies: ['AI vision', 'Python', 'Dashboard UX', 'Agri-tech concept'],
    role: 'Product and interaction design exploration',
    challenge:
      'A photo-only prediction can be misleading when image quality, crop context, dataset coverage, and local conditions are unknown.',
    evidence:
      'The existing crop-health concept note is the available project evidence. Repository contents, model implementation, datasets, field testing, and agronomy review have not been independently verified.',
    futureScope:
      'Work with qualified agricultural reviewers to define crop and region scope, source and document suitable data, evaluate failure cases, and only then test a cautious interface.',
    architectureSteps: [
      {
        label: 'Image capture',
        detail: 'The proposed experience begins with a crop photo. Supported devices, capture guidance, and image storage are not specified.',
        technologies: ['Dashboard UX']
      },
      {
        label: 'Quality + context',
        detail: 'Image quality and crop context are checked before a candidate is shown; the checks are not implemented or validated.',
        technologies: ['Python', 'AI vision']
      },
      {
        label: 'Candidate + uncertainty',
        detail: 'A model-assisted candidate is presented with uncertainty, not as a confirmed diagnosis. No model or confidence calibration is documented.',
        technologies: ['AI vision', 'Python']
      },
      {
        label: 'Reviewed guidance',
        detail: 'The proposed next step is guidance reviewed by people with local expertise. No expert review has been established.',
        technologies: ['Dashboard UX', 'Agri-tech concept']
      }
    ],
    technicalDecision:
      'Treat classification as a candidate, not a diagnosis, and require locally reviewed guidance. Dataset validity and model performance are unknown.',
    statusDetail:
      'Concept only; no model, disease identification, treatment recommendation, or field validation is claimed.',
    sourceInspected: false,
    githubUrl: 'https://github.com/yashgautam1205-code/AgriTech',
    demoUrl: null,
    screenshots: []
  },
  {
    title: 'JARVIS',
    visualSrc: '/project-art/jarvis-visual.svg',
    visualAlt:
      'Personal assistant concept with voice input, a central AI core, visible reasoning steps, and permission-aware desktop tasks.',
    label: 'Personal voice-assistant and automation project',
    status: 'Prototype direction',
    solutionType: 'Prototype direction',
    problem:
      'Small digital tasks can be scattered across apps, but voice-triggered automation needs clear permissions and confirmation to avoid surprising actions.',
    objective:
      'Explore a voice-assistant workflow where a request becomes a visible, permission-checked plan before any consequential action.',
    solution:
      'A personal assistant direction that turns a voice request into a visible action plan, asks for confirmation where needed, and reports what it did.',
    architecture:
      'Voice input → intent and context parsing → permission-checked action plan → user confirmation → automation result. No production integrations, always-listening behavior, or security guarantees are claimed.',
    technologies: ['Python', 'Automation', 'Voice interfaces', 'System workflows'],
    role: 'Personal assistant and automation prototype exploration',
    challenge:
      'A misread voice request could trigger the wrong action. The proposed flow needs explicit permissions, confirmation where needed, and a clear report of what happened.',
    evidence:
      'The existing portfolio concept note is the available project evidence. Repository source, integrations, and implementation details have not been independently verified.',
    futureScope:
      'Specify a narrow set of reversible actions, prototype the confirmation flow, and test permission boundaries and error reporting before considering broader integrations.',
    architectureSteps: [
      {
        label: 'Voice request',
        detail: 'The conceptual flow begins when a user provides a voice request. Listening mode, speech service, and privacy handling are unspecified.',
        technologies: ['Voice interfaces']
      },
      {
        label: 'Intent + context',
        detail: 'The request is interpreted in context. No speech or intent technology is documented.',
        technologies: ['Python', 'System workflows']
      },
      {
        label: 'Permission-checked plan',
        detail: 'The proposed plan is checked against permissions before an action is considered. No security guarantee is claimed.',
        technologies: ['Python', 'Automation']
      },
      {
        label: 'Confirm + report',
        detail: 'The user confirms where needed, then receives a report of the automation result. No production integrations are documented.',
        technologies: ['Automation', 'Voice interfaces']
      }
    ],
    technicalDecision:
      'Make the intended action visible and ask for confirmation where needed instead of silently running voice-triggered automation.',
    statusDetail:
      'Prototype direction only. Feature scope, implementation details, and any live demo have not been independently reviewed.',
    sourceInspected: false,
    githubUrl: 'https://github.com/yashgautam1205-code/Jarvis',
    demoUrl: null,
    screenshots: []
  }
] as const;

const projectPresentationOrder = {
  BrandGuard: 0,
  'CHRONOS-X': 1,
  JARVIS: 2,
  AgriTech: 3,
  NPC: 4,
  'Context-Surgeon': 5
} satisfies Record<(typeof projects)[number]['title'], number>;

export const orderedProjects = [...projects].sort(
  (left, right) => projectPresentationOrder[left.title] - projectPresentationOrder[right.title]
);

export const timeline = [
  {
    period: '2022 — Present',
    title: 'B.E. in Computer Science and Engineering',
    meta: 'ATME College of Engineering, Mysuru',
    description:
      'Building a strong foundation in software engineering, problem solving, and product-driven thinking while exploring modern web, AI, and system design.'
  },
  {
    period: 'Focus areas',
    title: 'Full-stack development • AI • Agent',
    meta: 'Self-directed growth and product experimentation',
    description:
      'Working on practical interfaces, automation workflows, and end-to-end product concepts that connect technical execution with user experience and real-world impact.'
  }
] as const;

export const workingPrinciples = [
  {
    title: 'Product thinking',
    description:
      'Focused on building ideas that solve real user needs, not just polished interfaces.'
  },
  {
    title: 'AI-first experimentation',
    description:
      'Exploring how intelligent workflows can simplify repetitive tasks and create measurable clarity.'
  },
  {
    title: 'Engineering discipline',
    description:
      'Balancing clean code, user experience, responsive systems, and practical deployment-ready thinking.'
  }
] as const;

type SocialLink = { label: string; href: string };

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/yashgautam1205-code' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-gautam-726518329/' },
  { label: 'Email', href: 'mailto:yashgautam1205@gmail.com' }
] as const;

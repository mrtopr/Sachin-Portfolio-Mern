// patch-projects-data.js
// Upserts 6 real projects with rich data into projectTable.
// Uses { upsert: true } so existing docs are updated, new ones are inserted.
// Also removes old placeholder seeded projects that are no longer relevant.

const { MongoClient } = require("mongodb");
require("dotenv").config();

const PROJECTS = [
  {
    // ── matches OLD title "Portfolio Website" ──
    _matchTitles: ["Portfolio Website", "Sachin's Portfolio + AI Companion"],
    projectTitle: "Sachin's Portfolio + AI Companion",
    projectLink: "sachin-portfolio-mern",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/Sachin-Portfolio-Mern",
    ],
    projectSubTitle: "React 18, Node.js, Fastify, MongoDB, OpenAI GPT-4",
    projectTimeline: "2025 - Present",
    projectTagline:
      "🚀 AI-Powered · Personal MERN portfolio with a custom AI Companion chatbot that answers questions about my background, projects, and experience in real-time.",
    projectParagraphs: [
      "Built a comprehensive full-stack portfolio using the MERN stack (MongoDB, Fastify, React 18, Node.js). Features an AI Companion chatbot powered by GPT-4 and vector search — visitors can ask questions about my work and get contextual, real-time answers in my voice.",
      "The AI pipeline uses OpenAI Embeddings + MongoDB Atlas Vector Search (RAG) to retrieve relevant context from my resume, GitHub projects, and portfolio data before generating responses. Includes voice input via Web Speech API and conversation memory for follow-up questions.",
      "Technical highlights: PDF parsing for resume extraction, semantic similarity search, react-markdown rendering with remark-gfm, Framer Motion animations, dynamic content management via admin dashboard, and production deployment on Vercel + Render.",
    ],
    projectURLs: [
      "https://sachin-portfolio-mern.vercel.app",
      "https://github.com/mrtopr/Sachin-Portfolio-Mern",
    ],
    badge: "🚀 AI-Powered",
    category: "Featured Project",
    techStack: [
      "React 18",
      "Framer Motion",
      "Node.js",
      "Fastify",
      "MongoDB Atlas",
      "OpenAI GPT-4",
      "Vector Search",
      "Web Speech API",
    ],
    keyFeatures: [
      "AI Companion with GPT-4 for real-time Q&A",
      "Semantic vector search across resume & projects",
      "Voice input via Web Speech API",
      "Conversation memory for contextual follow-ups",
      "PDF parsing for resume content extraction",
      "Mobile-first responsive design",
    ],
    likesCount: 0,
    deleted: false,
  },
  {
    // ── matches OLD title "Mehfil - Music Player" or no match → insert new ──
    _matchTitles: ["Music Player", "Mehfil - Music Player"],
    projectTitle: "Music Player",
    projectLink: "music-player",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/Music-Player",
    ],
    projectSubTitle: "HTML5, CSS3, Vanilla JavaScript (ES6)",
    projectTimeline: "2025",
    projectTagline:
      "🎵 Audio · Browser-based music player with playlist management, playback controls, and responsive design.",
    projectParagraphs: [
      "A fully functional music player built with vanilla JavaScript (zero dependencies) that provides essential audio playback features including play/pause, next/previous track navigation, progress bar with seek functionality, and volume control.",
      "Features a clean, responsive UI optimized for both mobile and desktop. Demonstrates core web fundamentals — DOM manipulation, event handling, the Web Audio API, and CSS animations — without any framework overhead.",
      "Cross-browser compatible, keyboard shortcut support, album art display, and auto-play logic make it a solid showcase of frontend fundamentals.",
    ],
    projectURLs: [
      "https://music-player-nine-indol.vercel.app",
      "https://github.com/mrtopr/Music-Player",
    ],
    badge: "🎵 Audio",
    category: "Web Application",
    techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Audio API"],
    keyFeatures: [
      "Play/Pause/Next/Previous controls",
      "Progress bar with seek functionality",
      "Volume slider with mute toggle",
      "Playlist navigation and management",
      "Responsive mobile/desktop layout",
      "Keyboard shortcut support",
    ],
    likesCount: 0,
    deleted: false,
  },
  {
    // ── matches OLD title "Placement IIIT-IE" ──
    _matchTitles: ["Placement IIIT-IE", "IIIT-BH Placement Portal"],
    projectTitle: "IIIT-BH Placement Portal",
    projectLink: "placement-iiit-ie",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/placement-iiit-IE",
    ],
    projectSubTitle: "Docusaurus, React, Firebase Auth, Google OAuth",
    projectTimeline: "2025 - Present",
    projectTagline:
      "👥 Contributed · Placement prep portal for IIIT-Bh students — interview experiences, OA practice, resume guides, and placement resources.",
    projectParagraphs: [
      "Contributed to this specialized placement preparation portal built exclusively for IIIT-Bh students. The platform combines real interview experiences from placed seniors, interactive MCQ & coding quizzes for online assessment practice, and professional document templates.",
      "Features domain-restricted Google OAuth (@iiit-bh.ac.in only) via Firebase to maintain campus integrity. Built on Docusaurus (React-based) for blazing-fast, SEO-optimized pages — achieving a 100/100 Google SEO score.",
      "Content is managed through Markdown/MDX, making it easy for students to contribute interview experiences via pull requests. Covers DSA, CS Fundamentals, System Design, resume writing, cover letters, and referral strategies.",
    ],
    projectURLs: [
      "https://interviews-at-iiit.vercel.app",
      "https://github.com/mrtopr/placement-iiit-IE",
    ],
    badge: "👥 Contributed",
    category: "Educational Platform",
    techStack: [
      "Docusaurus",
      "React",
      "MDX",
      "Firebase",
      "Google OAuth",
      "Vercel",
    ],
    keyFeatures: [
      "Domain-restricted Google OAuth (@iiit-bh.ac.in only)",
      "Curated interview experiences from placed students",
      "Interactive MCQ & coding quiz modules",
      "Resume writing guides + ATS-friendly templates",
      "Resource library: DSA, CS Fundamentals, System Design",
      "100/100 Google SEO score",
    ],
    likesCount: 0,
    deleted: false,
  },
  {
    // ── matches OLD title "EduArchive" ──
    _matchTitles: ["EduArchive"],
    projectTitle: "EduArchive",
    projectLink: "eduarchive",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/EduArchive",
    ],
    projectSubTitle: "HTML5, JavaScript, CSS3, Cloudinary",
    projectTimeline: "2025 (Work in Progress)",
    projectTagline:
      "📚 Academic · Student-first B.Tech resource platform — notes, PYQs, lab materials, and placement prep organized by Branch, Year, and Semester.",
    projectParagraphs: [
      "EduArchive is built on the idea that students should spend less time searching and more time learning. The platform organizes academic materials exactly the way students think — by Branch, Year, and Semester — providing centralized access to notes, previous year questions, lab manuals, and placement resources.",
      "Collaborative project with Aditya Shukla (ADITYASHUKLA189). Cloudinary integration enables scalable PDF and resource storage with in-browser preview and one-click download. Features fast search and filtering across all materials.",
      "Work in progress — currently compiling academic data. Future plans include a student-driven contribution system, smart resource categorization, subject-wise usage insights, and enhanced placement preparation modules.",
    ],
    projectURLs: [
      "https://mrtopr.github.io/EduArchive/",
      "https://github.com/mrtopr/EduArchive",
    ],
    badge: "📚 Academic",
    category: "Educational Platform",
    techStack: ["HTML5", "JavaScript", "CSS3", "Cloudinary", "GitHub Pages"],
    keyFeatures: [
      "Branch, Year & Semester-wise subject organization",
      "Centralized notes, PYQs, and lab materials",
      "PDF preview + direct download",
      "Cloud storage via Cloudinary",
      "Placement & career preparation section",
      "Collaborative with community contributions",
    ],
    likesCount: 0,
    deleted: false,
  },
  {
    // ── matches OLD title "SentinelLink" ──
    _matchTitles: ["SentinelLink", "SentinelLink (Anginat)"],
    projectTitle: "SentinelLink",
    projectLink: "sentinel-link",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/SentinelLink",
    ],
    projectSubTitle:
      "React 18, TypeScript, Node.js, PostgreSQL, Socket.IO, Prisma, Tailwind CSS",
    projectTimeline: "2025",
    projectTagline:
      "🚨 Real-Time · Emergency incident reporting and resource coordination platform bridging citizens and authorities with live maps, duplicate detection, and Socket.IO updates.",
    projectParagraphs: [
      "SentinelLink (codenamed Anginat) is a hackathon project that leverages real-time WebSockets, geospatial visualization, and automated duplicate detection to streamline emergency response. Citizens report incidents with location and media; authorities get real-time notifications and a command dashboard.",
      "Built with React 18 + TypeScript + Vite on the frontend (Leaflet maps, Tailwind CSS, Socket.IO client) and Node.js + Express + Prisma ORM + PostgreSQL on the backend. Features intelligent duplicate detection using a 200m radius / 10-minute temporal window to reduce noise during peak events.",
      "Production-ready architecture: JWT authentication, Cloudinary for media CDN, Socket.IO rooms for efficient broadcasting, and geospatial indexing on PostgreSQL. Deployed on Vercel (frontend) and Render (backend). Backend health: https://sentinellink-backend.onrender.com/health",
    ],
    projectURLs: [
      "https://sentinel-link-xxys.vercel.app",
      "https://github.com/mrtopr/SentinelLink",
    ],
    badge: "🚨 Real-Time",
    category: "Featured Project",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Leaflet Maps",
      "Socket.IO",
      "Node.js",
      "Express",
      "Prisma ORM",
      "PostgreSQL",
      "Cloudinary",
    ],
    keyFeatures: [
      "Instant incident reporting with auto-location detection",
      "Live interactive heatmap of ongoing incidents",
      "Real-time Socket.IO notifications for authorities",
      "Intelligent duplicate detection (200m / 10min window)",
      "Media upload via Cloudinary",
      "Community validation via upvote system",
      "Emergency broadcast system",
      "JWT authentication",
    ],
    likesCount: 0,
    deleted: false,
  },
  {
    // ── matches OLD title "ThoughtOS" ──
    _matchTitles: ["ThoughtOS"],
    projectTitle: "ThoughtOS",
    projectLink: "thoughtos",
    projectImages: [
      "https://opengraph.githubassets.com/1/mrtopr/ThoughtOS",
    ],
    projectSubTitle: "React, Vite, JavaScript, CSS3, Supabase",
    projectTimeline: "2026",
    projectTagline:
      "🧠 Experimental · Premium personal command center with glassmorphic design — context-aware workspaces, deep focus timer, smart content management, and AI-powered writing tools.",
    projectParagraphs: [
      "ThoughtOS is a high-performance personal productivity platform designed to streamline digital workflows. Context-aware workspaces let you isolate content by purpose (YouTube Creator, Student, Personal, etc.) with custom themes and archive/unarchive logic.",
      "The Deep Focus Timer 2.0 features Pomodoro-style intervals, animated progress rings, persistent visual and audio alarms, and session tracking. Built with a state-of-the-art glassmorphism design system using CSS keyframes and dynamic gradient backgrounds.",
      "Supabase backend for cloud data persistence. Integrated AI-powered text rewriter for polishing notes and content on the fly. Zero external UI library dependencies — pure custom CSS with micro-animations throughout.",
    ],
    projectURLs: [
      "https://thought-os.vercel.app",
      "https://github.com/mrtopr/ThoughtOS",
    ],
    badge: "🧠 Experimental",
    category: "Productivity Tool",
    techStack: ["React", "Vite", "JavaScript", "CSS3", "Supabase", "Lucide React"],
    keyFeatures: [
      "Context-aware workspaces with isolated data",
      "Deep Focus Timer 2.0 with animated progress rings",
      "AI-powered text rewriter",
      "Workspace archive/unarchive logic",
      "Premium glassmorphic UI with dynamic gradients",
      "Supabase backend for cloud sync",
      "Persistent visual/audio alarm system",
    ],
    likesCount: 0,
    deleted: false,
  },
];

// Placeholder titles seeded by populate-db.js that should be removed
const PLACEHOLDER_TITLES = [
  "Weather Dashboard",
  "E-Commerce UI Kit",
  "Task Manager App",
  "Blog Platform",
];

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME || "SachinPortfolioDB");
  const col = db.collection("projectTable");

  // 1. Remove stale placeholder projects
  const delResult = await col.deleteMany({ projectTitle: { $in: PLACEHOLDER_TITLES } });
  console.log(`🗑  Removed ${delResult.deletedCount} placeholder project(s)`);

  // 2. Upsert each real project
  for (const proj of PROJECTS) {
    const { _matchTitles, ...doc } = proj;

    // Try to find an existing doc by any of the known old/new titles
    const existing = await col.findOne({ projectTitle: { $in: _matchTitles } });

    if (existing) {
      await col.updateOne(
        { _id: existing._id },
        { $set: doc }
      );
      console.log(`✅ Updated: "${existing.projectTitle}" → "${doc.projectTitle}"`);
    } else {
      await col.insertOne(doc);
      console.log(`➕ Inserted: "${doc.projectTitle}"`);
    }
  }

  await client.close();
  console.log("\n✨ Done. All 6 projects are up to date.");
}

run().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

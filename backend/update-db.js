// update-db.js — Update Sachin Kumar's portfolio data from resume
const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || "SachinPortfolioDB";

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`Connected to ${DB_NAME}`);

  // ── Skills Collection ──
  const skillsCollection = db.collection("skillsCollection");
  await skillsCollection.deleteMany({});
  await skillsCollection.insertMany([
    {
      title: "Programming Languages",
      description:
        "Core programming languages used for software development, competitive programming, and problem-solving.",
      skills: [
        { logo: "c", name: "C", proficiency: "proficient" },
        { logo: "cpp", name: "C++", proficiency: "proficient" },
        { logo: "javascript", name: "JavaScript", proficiency: "proficient" },
        { logo: "typescript", name: "TypeScript", proficiency: "intermediate" },
      ],
      deleted: false,
    },
    {
      title: "Frontend Development",
      description:
        "Building responsive, accessible, and interactive web applications with modern frontend technologies.",
      skills: [
        { logo: "html", name: "HTML5", proficiency: "proficient" },
        { logo: "css", name: "CSS3", proficiency: "proficient" },
        { logo: "bootstrap", name: "Bootstrap", proficiency: "proficient" },
      ],
      deleted: false,
    },
    {
      title: "Core CS & Tools",
      description:
        "Strong fundamentals in computer science concepts and development tooling.",
      skills: [
        { logo: "github", name: "Git & GitHub", proficiency: "intermediate" },
        { logo: "cpp", name: "DSA", proficiency: "proficient" },
        { logo: "python", name: "OOP", proficiency: "intermediate" },
      ],
      deleted: false,
    },
  ]);
  console.log("✅ skillsCollection updated");

  // ── Skills Table (radar chart data) ──
  const skillsTable = db.collection("skillsTable");
  await skillsTable.deleteMany({});
  await skillsTable.insertMany([
    {
      skillTitle: "C++",
      skillDescription:
        "Strong C++ proficiency through competitive programming, solving 150+ problems on LeetCode with focus on DSA.",
      Labels: ["Problem Solving", "DSA", "OOP", "STL", "Algorithms"],
      Scores: [4.8, 4.7, 4.5, 4.5, 4.6],
      deleted: false,
    },
    {
      skillTitle: "JavaScript",
      skillDescription:
        "Proficient in JavaScript for building responsive web applications and working with APIs.",
      Labels: ["DOM", "ES6+", "APIs", "Responsive", "Event Handling"],
      Scores: [4.7, 4.6, 4.5, 4.7, 4.5],
      deleted: false,
    },
    {
      skillTitle: "HTML5",
      skillDescription:
        "Strong HTML skills for semantic, accessible, and well-structured web pages.",
      Labels: ["Semantic", "Accessibility", "Forms", "Media", "Structure"],
      Scores: [4.8, 4.5, 4.6, 4.3, 4.7],
      deleted: false,
    },
    {
      skillTitle: "CSS3",
      skillDescription:
        "Proficient CSS skills covering responsive layouts, animations, Bootstrap, and modern styling.",
      Labels: ["Responsive", "Flexbox/Grid", "Animations", "Bootstrap", "Design"],
      Scores: [4.7, 4.6, 4.3, 4.5, 4.4],
      deleted: false,
    },
    {
      skillTitle: "C",
      skillDescription:
        "Solid C programming foundation for system-level understanding, data structures, and algorithms.",
      Labels: ["Pointers", "Memory Mgmt", "Data Structures", "Algorithms", "Systems"],
      Scores: [4.5, 4.3, 4.6, 4.5, 4.0],
      deleted: false,
    },
  ]);
  console.log("✅ skillsTable updated");

  // ── Projects ──
  const projectTable = db.collection("projectTable");
  await projectTable.deleteMany({});
  await projectTable.insertMany([
    {
      projectTitle: "Mehfil - Music Player",
      projectLink: "mehfil---music-player",
      projectImages: [],
      projectSubTitle: "HTML, CSS, JavaScript, JioSaavn API, GSAP",
      projectTimeline: "2025",
      projectTagline:
        "A responsive, feature-rich music player with live streaming using the JioSaavn API.",
      projectParagraphs: [
        "Built a responsive, feature-rich music player with live streaming using the JioSaavn API.",
        "Implemented play/pause, shuffle/repeat, dynamic playlists, mini-player mode, and audio controls.",
        "Designed modular UI components and implemented animations using GSAP to improve user experience.",
        "Integrated dynamic content loading, song cards, sidebar nav, and top charts display.",
      ],
      projectURLs: ["https://github.com/mrtopr/Music-Player", "https://music-player-nine-indol.vercel.app"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "EduArchive",
      projectLink: "eduarchive",
      projectImages: [],
      projectSubTitle: "HTML, CSS, JavaScript, Cloudinary",
      projectTimeline: "2025",
      projectTagline:
        "A scalable, student-first web app to centralize B.Tech academic and placement resources.",
      projectParagraphs: [
        "Built a scalable, student-first web application to centralize B.Tech academic and placement resources with branch, year, and semester-based architecture.",
        "Implemented responsive and maintainable frontend components using vanilla HTML, CSS, and JavaScript, emphasizing performance and clean UI/UX.",
        "Integrated Cloudinary for efficient cloud-based storage, preview, and direct download of large academic PDF files.",
        "Designed the project with a modular structure to support future feature expansion, content contributions, and improved search capabilities.",
      ],
      projectURLs: ["https://github.com/mrtopr/EduArchive", "https://mrtopr.github.io/EduArchive/"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "SentinelLink",
      projectLink: "sentinellink",
      projectImages: [],
      projectSubTitle: "TypeScript, Next.js, Full-Stack",
      projectTimeline: "2025",
      projectTagline:
        "A full-stack web application built with TypeScript.",
      projectParagraphs: [
        "Developed SentinelLink, a full-stack web application using TypeScript with a dedicated frontend and backend architecture.",
        "Built a responsive frontend deployed on Vercel for fast, global delivery.",
        "Designed and implemented a separate backend service for robust API handling and data management.",
      ],
      projectURLs: ["https://github.com/mrtopr/SentinelLink", "https://sentinel-link-xyys.vercel.app"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Placement IIIT-IE",
      projectLink: "placement-iiit-ie",
      projectImages: [],
      projectSubTitle: "JavaScript, Web Development",
      projectTimeline: "2025",
      projectTagline:
        "Comprehensive online portal to help IIIT-Bh students ace their upcoming interviews.",
      projectParagraphs: [
        "Built a comprehensive online portal designed to help students at IIIT Bhubaneswar prepare for interviews and placements.",
        "Implemented interactive features and resource management using JavaScript.",
        "Deployed on Vercel for fast, reliable access by students.",
      ],
      projectURLs: ["https://github.com/mrtopr/placement-iiit-IE", "https://interviews-at-iiit.vercel.app"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "ThoughtOS",
      projectLink: "thoughtos",
      projectImages: [],
      projectSubTitle: "JavaScript, Web Application",
      projectTimeline: "2025",
      projectTagline:
        "A creative web application built with JavaScript and deployed on Vercel.",
      projectParagraphs: [
        "Created ThoughtOS, an innovative web application using JavaScript.",
        "Designed for a smooth user experience with clean UI and responsive layout.",
        "Deployed and live at thought-os.vercel.app.",
      ],
      projectURLs: ["https://github.com/mrtopr/ThoughtOS", "https://thought-os.vercel.app"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Portfolio Website",
      projectLink: "portfolio-website",
      projectImages: [],
      projectSubTitle: "HTML, CSS, JavaScript",
      projectTimeline: "2025",
      projectTagline:
        "A personal portfolio website showcasing skills, projects, and experiences.",
      projectParagraphs: [
        "Built a personal portfolio website to showcase skills, projects, and experiences as a Frontend Developer.",
        "Designed with clean, responsive HTML, CSS, and JavaScript for a polished user experience.",
        "Live at heysachin.me with a focus on modern web design principles.",
      ],
      projectURLs: ["https://github.com/mrtopr/portfolio", "http://heysachin.me/"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "NCERT Books Portal",
      projectLink: "ncert-books-portal",
      projectImages: [],
      projectSubTitle: "HTML, Web Development",
      projectTimeline: "2024",
      projectTagline:
        "Website providing organized access to NCERT books for Class 7-12 in Hindi medium.",
      projectParagraphs: [
        "Built a web portal providing organized and easy access to NCERT books from Class 7 to 12 in Hindi medium.",
        "Structured content for efficient navigation and quick access to educational resources.",
      ],
      projectURLs: ["https://github.com/mrtopr/ncert-books", "https://mrtopr.github.io/ncert-books/"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Bat Ball Wicket",
      projectLink: "bat-ball-wicket",
      projectImages: [],
      projectSubTitle: "HTML, CSS, JavaScript",
      projectTimeline: "2024",
      projectTagline:
        "A fun, lightweight cricket-inspired browser game built with HTML, CSS, and JavaScript.",
      projectParagraphs: [
        "Created a fun, lightweight cricket-inspired browser game using HTML, CSS, and JavaScript.",
        "Implemented game mechanics, scoring system, and interactive UI for an engaging user experience.",
      ],
      projectURLs: ["https://github.com/mrtopr/BatBallWicket", "https://mrtopr.github.io/BatBallWicket/"],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ projectTable updated");

  // ── Experiences ──
  const experienceTable = db.collection("experienceTable");
  await experienceTable.deleteMany({});
  await experienceTable.insertMany([
    {
      experienceTitle: "App Tester - Colx Student Marketplace",
      experienceLink: "app-tester---colx-student-marketplace",
      experienceImages: [],
      experienceSubTitle: "Colx | Remote",
      experienceTimeline: "January 2025 – March 2025",
      experienceTagline:
        "Performed manual and exploratory testing for a student marketplace app, reporting bugs and suggesting UX improvements.",
      experienceParagraphs: [
        "Contributed to testing the Colx app — a marketplace built exclusively for student communities.",
        "Performed manual and exploratory testing across major features including item listing, messaging, and search functionality.",
        "Reported usability bugs and suggested UX improvements for listing and browsing flow.",
        "Tested and provided detailed feedback to the development team via test cases and reports.",
      ],
      experienceURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ experienceTable updated");

  // ── Involvements (Positions of Responsibility) ──
  const involvementTable = db.collection("involvementTable");
  await involvementTable.deleteMany({});
  await involvementTable.insertMany([
    {
      involvementTitle: "Design & Content Coordinator",
      involvementLink: "design-&-content-coordinator",
      involvementImages: [],
      involvementSubTitle: "Placement Cell, IIIT Bhubaneswar",
      involvementTimeline: "October 2025 – Present",
      involvementTagline:
        "Coordinating design and content efforts for the placement cell of IIIT Bhubaneswar.",
      involvementParagraphs: [
        "Serving as Design & Content Coordinator at the Placement Cell of IIIT Bhubaneswar.",
        "Creating visual content, presentations, and materials to support placement activities and student engagement.",
      ],
      involvementURLs: [],
      likesCount: 0,
      deleted: false,
    },
    {
      involvementTitle: "Video Editor & Photographer",
      involvementLink: "video-editor-&-photographer",
      involvementImages: [],
      involvementSubTitle: "Flux Society, IIIT Bhubaneswar",
      involvementTimeline: "November 2024 – Present",
      involvementTagline:
        "Creating video content and photography for Flux Society at IIIT Bhubaneswar.",
      involvementParagraphs: [
        "Active member of Flux Society at IIIT Bhubaneswar, contributing as a Video Editor and Photographer.",
        "Producing creative visual content for society events, social media, and promotional materials.",
      ],
      involvementURLs: [],
      likesCount: 0,
      deleted: false,
    },
    {
      involvementTitle: "Media Team - Advaita'25",
      involvementLink: "media-team---advaita'25",
      involvementImages: [],
      involvementSubTitle: "IIIT Bhubaneswar",
      involvementTimeline: "2025",
      involvementTagline:
        "Member of the Media Team for Advaita'25, the annual tech-cultural fest of IIIT Bhubaneswar.",
      involvementParagraphs: [
        "Part of the Media Team for Advaita'25, covering event photography, videography, and social media content.",
      ],
      involvementURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ involvementTable updated");

  // ── Honors Experiences ──
  const honorsExperienceTable = db.collection("honorsExperienceTable");
  await honorsExperienceTable.deleteMany({});
  await honorsExperienceTable.insertMany([
    {
      honorsExperienceTitle: "Competitive Programming Journey",
      honorsExperienceLink: "competitive-programming-journey",
      honorsExperienceImages: [],
      honorsExperienceSubTitle: "LeetCode | Self-Driven",
      honorsExperienceTimeline: "2024 – Present",
      honorsExperienceTagline:
        "Solved 150+ problems on LeetCode, building strong algorithmic thinking and problem-solving skills.",
      honorsExperienceParagraphs: [
        "Solved 150+ problems on LeetCode covering arrays, strings, linked lists, trees, graphs, dynamic programming, and more.",
        "Actively improving algorithmic thinking through competitive programming and hands-on practice.",
        "Applying DSA concepts to build efficient, optimized solutions in C++ and JavaScript.",
      ],
      honorsExperienceURLs: ["https://leetcode.com/"],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ honorsExperienceTable updated");

  // ── Year In Review ──
  const yearInReviewTable = db.collection("yearInReviewTable");
  await yearInReviewTable.deleteMany({});
  await yearInReviewTable.insertMany([
    {
      yearInReviewTitle: "Year In Review 2024 - 2025",
      yearInReviewLink: "year-in-review-2024---2025",
      yearInReviewImages: [],
      yearInReviewSubTitle: "",
      yearInReviewTimeline: "2024 - 2025",
      yearInReviewTagline:
        "From starting college at IIIT Bhubaneswar to building real-world projects and solving 150+ coding problems.",
      yearInReviewParagraphs: [
        "Started my B.Tech in Computer Engineering at IIIT Bhubaneswar in 2024, diving deep into core CS concepts, data structures, and algorithms.",
        "Built hands-on projects like Mehfil (music player with JioSaavn API) and EduArchive (academic resource platform), learning JavaScript, API integration, and modern web development.",
        "Solved 150+ problems on LeetCode, joined Flux Society as a video editor/photographer, and contributed to the Placement Cell as Design & Content Coordinator.",
        "Looking forward to 2026 with goals to learn React, build full-stack applications, and contribute to open source.",
      ],
      yearInReviewURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ yearInReviewTable updated");

  await client.close();
  console.log("\n🎉 All collections updated with resume data!");
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});

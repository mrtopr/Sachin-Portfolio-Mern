// populate-db.js — One-time script to seed Sachin Kumar's portfolio data
const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || "SachinPortfolioDB";

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log(`Connected to ${DB_NAME}`);

  // ── Skills Collection (skill categories with icons) ──
  const skillsCollection = db.collection("skillsCollection");
  await skillsCollection.deleteMany({});
  await skillsCollection.insertMany([
    {
      title: "Frontend Development",
      description:
        "Building responsive, interactive, and pixel-perfect user interfaces with modern web technologies.",
      skills: [
        { logo: "html", name: "HTML5", proficiency: "proficient" },
        { logo: "css", name: "CSS3", proficiency: "proficient" },
        { logo: "javascript", name: "JavaScript", proficiency: "proficient" },
        { logo: "react", name: "React", proficiency: "proficient" },
        { logo: "typescript", name: "TypeScript", proficiency: "intermediate" },
        { logo: "framermotion", name: "Framer Motion", proficiency: "intermediate" },
      ],
      deleted: false,
    },
    {
      title: "Backend & Databases",
      description:
        "Server-side development, API design, and database management for full-stack applications.",
      skills: [
        { logo: "nodejs", name: "Node.js", proficiency: "intermediate" },
        { logo: "express", name: "Express.js", proficiency: "intermediate" },
        { logo: "mongodb", name: "MongoDB", proficiency: "intermediate" },
        { logo: "python", name: "Python", proficiency: "intermediate" },
        { logo: "sql", name: "SQL", proficiency: "beginner" },
      ],
      deleted: false,
    },
    {
      title: "Tools & Technologies",
      description:
        "Development tools, platforms, and technologies used across projects.",
      skills: [
        { logo: "linux", name: "Linux", proficiency: "intermediate" },
        { logo: "java", name: "Java", proficiency: "beginner" },
        { logo: "cpp", name: "C++", proficiency: "beginner" },
        { logo: "flask", name: "Flask", proficiency: "beginner" },
        { logo: "d3", name: "D3.js", proficiency: "beginner" },
      ],
      deleted: false,
    },
  ]);
  console.log("✅ skillsCollection seeded");

  // ── Skills Table (radar chart data) ──
  const skillsTable = db.collection("skillsTable");
  await skillsTable.deleteMany({});
  await skillsTable.insertMany([
    {
      skillTitle: "JavaScript",
      skillDescription:
        "Proficient in JavaScript with deep understanding of ES6+, async programming, DOM manipulation, and modern frameworks.",
      Labels: ["ES6+", "DOM", "Async", "Frameworks", "Problem Solving"],
      Scores: [4.8, 4.7, 4.5, 4.6, 4.5],
      deleted: false,
    },
    {
      skillTitle: "React",
      skillDescription:
        "Experienced with React ecosystem including hooks, context, component design patterns, and state management.",
      Labels: ["Hooks", "Components", "State Mgmt", "Performance", "Testing"],
      Scores: [4.7, 4.8, 4.3, 4.2, 3.8],
      deleted: false,
    },
    {
      skillTitle: "CSS3",
      skillDescription:
        "Strong CSS skills covering responsive design, animations, flexbox, grid, and modern styling approaches.",
      Labels: ["Responsive", "Animations", "Flexbox/Grid", "Preprocessors", "Design Systems"],
      Scores: [4.8, 4.6, 4.7, 4.0, 4.2],
      deleted: false,
    },
    {
      skillTitle: "Node.js",
      skillDescription:
        "Intermediate-level Node.js development including REST APIs, Express/Fastify, and server-side logic.",
      Labels: ["REST APIs", "Express", "Middleware", "Auth", "Databases"],
      Scores: [4.3, 4.2, 4.0, 3.8, 4.0],
      deleted: false,
    },
    {
      skillTitle: "Python",
      skillDescription:
        "Versatile Python skills for scripting, automation, data processing, and backend development.",
      Labels: ["Scripting", "Automation", "Data Processing", "Flask", "Problem Solving"],
      Scores: [4.2, 4.0, 3.8, 3.5, 4.3],
      deleted: false,
    },
    {
      skillTitle: "TypeScript",
      skillDescription:
        "Growing TypeScript proficiency with type-safe React development and modern tooling.",
      Labels: ["Types", "Interfaces", "React+TS", "Generics", "Tooling"],
      Scores: [4.0, 3.8, 4.2, 3.5, 3.8],
      deleted: false,
    },
    {
      skillTitle: "MongoDB",
      skillDescription:
        "Database design and querying with MongoDB including aggregation pipelines and Atlas.",
      Labels: ["CRUD", "Aggregation", "Schema Design", "Atlas", "Indexing"],
      Scores: [4.2, 3.8, 4.0, 4.0, 3.5],
      deleted: false,
    },
  ]);
  console.log("✅ skillsTable seeded");

  // ── Projects ──
  const projectTable = db.collection("projectTable");
  await projectTable.deleteMany({});
  await projectTable.insertMany([
    {
      projectTitle: "Portfolio Website",
      projectLink: "portfolio-website",
      projectImages: [],
      projectSubTitle: "React, Node.js, MongoDB",
      projectTimeline: "2025 - Present",
      projectTagline:
        "A full-stack MERN portfolio showcasing projects, skills, and an AI-powered chatbot companion.",
      projectParagraphs: [
        "Built a comprehensive portfolio website using the MERN stack (MongoDB, Express/Fastify, React, Node.js) with a modern, responsive design.",
        "Features include an AI-powered chatbot companion using Gemini API with RAG-based context retrieval, dynamic skill visualizations with radar charts, and a smooth single-page experience with Framer Motion animations.",
        "Implemented dark mode support, SEO optimization, and a custom admin dashboard for content management.",
      ],
      projectURLs: ["https://heysachin.me", "https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Weather Dashboard",
      projectLink: "weather-dashboard",
      projectImages: [],
      projectSubTitle: "React, OpenWeather API",
      projectTimeline: "2025",
      projectTagline:
        "A clean, interactive weather dashboard with real-time data, forecasts, and location search.",
      projectParagraphs: [
        "Developed a responsive weather application using React that fetches real-time weather data from the OpenWeather API.",
        "Features include city search with autocomplete, 5-day forecasts, weather condition icons, and temperature unit conversion between Celsius and Fahrenheit.",
        "Focused on clean UI/UX design with smooth transitions and a mobile-first responsive layout.",
      ],
      projectURLs: ["https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "E-Commerce UI Kit",
      projectLink: "e-commerce-ui-kit",
      projectImages: [],
      projectSubTitle: "HTML, CSS, JavaScript",
      projectTimeline: "2024",
      projectTagline:
        "A reusable, responsive e-commerce UI component library with modern design patterns.",
      projectParagraphs: [
        "Created a comprehensive UI kit for e-commerce applications featuring product cards, navigation, cart components, and checkout flows.",
        "Built with vanilla HTML, CSS, and JavaScript to demonstrate core web fundamentals without framework dependencies.",
        "Includes responsive grid layouts, CSS animations, and accessible form components following WCAG guidelines.",
      ],
      projectURLs: ["https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Task Manager App",
      projectLink: "task-manager-app",
      projectImages: [],
      projectSubTitle: "React, Local Storage",
      projectTimeline: "2024",
      projectTagline:
        "A productivity app with drag-and-drop task management, categories, and progress tracking.",
      projectParagraphs: [
        "Built a feature-rich task management application using React with drag-and-drop functionality for organizing tasks across different status columns.",
        "Implemented persistent storage using browser localStorage, task categorization with color-coded labels, due date reminders, and progress analytics.",
        "Designed with a focus on usability featuring keyboard shortcuts, bulk actions, and a clean minimalist interface.",
      ],
      projectURLs: ["https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
    {
      projectTitle: "Blog Platform",
      projectLink: "blog-platform",
      projectImages: [],
      projectSubTitle: "Node.js, MongoDB, React",
      projectTimeline: "2024",
      projectTagline:
        "A full-stack blogging platform with markdown support, user authentication, and comment system.",
      projectParagraphs: [
        "Developed a full-stack blog platform with user registration, JWT authentication, and a rich markdown editor for creating posts.",
        "Backend built with Node.js and Express with MongoDB for data storage, featuring RESTful API design and input validation.",
        "Frontend features include infinite scroll feed, category filtering, comment threads, and a responsive reading experience optimized for all devices.",
      ],
      projectURLs: ["https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ projectTable seeded");

  // ── Experiences ──
  const experienceTable = db.collection("experienceTable");
  await experienceTable.deleteMany({});
  await experienceTable.insertMany([
    {
      experienceTitle: "Freelance Frontend Developer",
      experienceLink: "freelance-frontend-developer",
      experienceImages: [],
      experienceSubTitle: "Self-Employed | Remote",
      experienceTimeline: "2024 - Present",
      experienceTagline:
        "Building custom websites and web applications for clients with a focus on modern UI/UX and responsive design.",
      experienceParagraphs: [
        "Working as a freelance frontend developer, delivering custom web solutions for small businesses and individual clients.",
        "Specialize in responsive design, interactive animations, and modern frontend frameworks like React. Handle full project lifecycle from design mockups to deployment.",
        "Built and maintained 5+ client projects with a focus on performance optimization, accessibility, and cross-browser compatibility.",
      ],
      experienceURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ experienceTable seeded");

  // ── Involvements ──
  const involvementTable = db.collection("involvementTable");
  await involvementTable.deleteMany({});
  await involvementTable.insertMany([
    {
      involvementTitle: "Open Source Contributor",
      involvementLink: "open-source-contributor",
      involvementImages: [],
      involvementSubTitle: "GitHub Community",
      involvementTimeline: "2024 - Present",
      involvementTagline:
        "Contributing to open-source projects and sharing knowledge with the developer community.",
      involvementParagraphs: [
        "Actively contributing to open-source projects on GitHub, focusing on frontend libraries and developer tools.",
        "Participate in code reviews, submit bug fixes, and help improve documentation for community projects.",
      ],
      involvementURLs: ["https://github.com/heysachin02"],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ involvementTable seeded");

  // ── Honors Experiences (optional - tech achievements) ──
  const honorsExperienceTable = db.collection("honorsExperienceTable");
  await honorsExperienceTable.deleteMany({});
  await honorsExperienceTable.insertMany([
    {
      honorsExperienceTitle: "Self-Taught Developer Journey",
      honorsExperienceLink: "self-taught-developer-journey",
      honorsExperienceImages: [],
      honorsExperienceSubTitle: "Personal Achievement",
      honorsExperienceTimeline: "2023 - Present",
      honorsExperienceTagline:
        "From curiosity to competency — learning web development through dedication, online resources, and hands-on projects.",
      honorsExperienceParagraphs: [
        "Started my development journey as a self-taught programmer, learning through online platforms like freeCodeCamp, MDN Web Docs, and YouTube tutorials.",
        "Built a structured learning path covering HTML/CSS fundamentals, JavaScript, React, Node.js, and MongoDB — progressing from simple static pages to full-stack applications.",
        "Documented the journey through blog posts and project showcases, inspiring other aspiring developers to take the self-taught path.",
      ],
      honorsExperienceURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ honorsExperienceTable seeded");

  // ── Year In Review (optional) ──
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
        "A look back at a year of growth, learning, and building amazing projects.",
      yearInReviewParagraphs: [
        "2024-2025 was a transformative year in my development journey. I went from learning the basics of HTML/CSS to building full-stack MERN applications with AI-powered features.",
        "Completed 5+ projects, contributed to open source, and started freelancing as a frontend developer. Explored new technologies like TypeScript, Framer Motion, and the Gemini API.",
        "Looking forward to 2026 with goals to deepen my backend skills, contribute more to open source, and potentially pursue full-time opportunities in frontend development.",
      ],
      yearInReviewURLs: [],
      likesCount: 0,
      deleted: false,
    },
  ]);
  console.log("✅ yearInReviewTable seeded");

  await client.close();
  console.log("\n🎉 All collections seeded successfully!");
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});

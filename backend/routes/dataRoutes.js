// routes/dataRoutes.js
const dataController = require("../controllers/dataController");
const verifyJWT = require("../controllers/middlewareController");
// const {
//   getDbContextFile,
//   getGithubContextFile,
//   getResumeContextFile,
//   getRelevantContext,
//   askLLM,
// } = require("../controllers/aiContextManager");

async function dataRoutes(fastify, options) {
  // Protected route to check if admin cookie/JWT is valid
  fastify.get(
    "/check-cookie",
    { preHandler: [verifyJWT] },
    (request, reply) => {
      reply.send({
        message: "Protected Cookie. Logged In as Admin!",
        valid: true,
        user: request.user,
      });
    }
  );

  // Simple health check routes
  fastify.get("/ping", (request, reply) => {
    reply.send({ message: "Backend is active" });
  });
  fastify.get("/db-ping", async (request, reply) => {
    try {
      const db = require("../config/mongodb").getDB();
      // Simple query to test DB connection
      await db.collection("someCollection").findOne({});
      reply.send({ message: "MongoDB is active" });
    } catch (error) {
      reply
        .code(500)
        .send({ message: "MongoDB is not connected", error: error });
    }
  });

  // Must-load static images
  fastify.get("/must-load-images", dataController.getMustLoadImages);

  // Dynamic images
  fastify.get("/dynamic-images", dataController.getDynamicImages);

  // Projects
  fastify.get("/getprojects", dataController.getProjects);
  fastify.get("/getprojects/:projectLink", dataController.getProjectByLink);
  fastify.post(
    "/addproject",
    { preHandler: [verifyJWT] },
    dataController.addProject
  );
  fastify.put(
    "/updateproject/:id",
    { preHandler: [verifyJWT] },
    dataController.updateProject
  );
  fastify.delete(
    "/deleteproject/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteProject
  );

  // Involvements
  fastify.get("/getinvolvements", dataController.getInvolvements);
  fastify.get(
    "/getinvolvements/:involvementLink",
    dataController.getInvolvementByLink
  );
  fastify.post(
    "/addinvolvement",
    { preHandler: [verifyJWT] },
    dataController.addInvolvement
  );
  fastify.put(
    "/updateinvolvement/:id",
    { preHandler: [verifyJWT] },
    dataController.updateInvolvement
  );
  fastify.delete(
    "/deleteinvolvement/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteInvolvement
  );

  // Experiences
  fastify.get("/getexperiences", dataController.getExperiences);
  fastify.get(
    "/getexperiences/:experienceLink",
    dataController.getExperienceByLink
  );
  fastify.post(
    "/addexperience",
    { preHandler: [verifyJWT] },
    dataController.addExperience
  );
  fastify.put(
    "/updateexperience/:id",
    { preHandler: [verifyJWT] },
    dataController.updateExperience
  );
  fastify.delete(
    "/deleteexperience/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteExperience
  );

  // Year In Reviews
  fastify.get("/getyearinreviews", dataController.getYearInReviews);
  fastify.get(
    "/getyearinreviews/:yearInReviewLink",
    dataController.getYearInReviewByLink
  );
  fastify.post(
    "/addyearinreview",
    { preHandler: [verifyJWT] },
    dataController.addYearInReview
  );
  fastify.put(
    "/updateyearinreview/:id",
    { preHandler: [verifyJWT] },
    dataController.updateYearInReview
  );
  fastify.delete(
    "/deleteyearinreview/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteYearInReview
  );

  // Honors Experiences
  fastify.get("/gethonorsexperiences", dataController.getHonorsExperiences);
  fastify.get(
    "/gethonorsexperiences/:honorsExperienceLink",
    dataController.getHonorsExperienceByLink
  );
  fastify.post(
    "/addhonorsexperience",
    { preHandler: [verifyJWT] },
    dataController.addHonorsExperience
  );
  fastify.put(
    "/updatehonorsexperience/:id",
    { preHandler: [verifyJWT] },
    dataController.updateHonorsExperience
  );
  fastify.delete(
    "/deletehonorsexperience/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteHonorsExperience
  );

  // Skills
  fastify.get("/getskills", dataController.getSkills);
  fastify.get("/getskillcomponents", dataController.getSkillComponents);
  fastify.post(
    "/addskill",
    { preHandler: [verifyJWT] },
    dataController.addSkill
  );
  fastify.put(
    "/updateskill/:id",
    { preHandler: [verifyJWT] },
    dataController.updateSkill
  );
  fastify.delete(
    "/deleteskill/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteSkill
  );
  fastify.post(
    "/addskillcomponent",
    { preHandler: [verifyJWT] },
    dataController.addSkillComponent
  );
  fastify.put(
    "/updateskillcomponent/:id",
    { preHandler: [verifyJWT] },
    dataController.updateSkillComponent
  );
  fastify.delete(
    "/deleteskillcomponent/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteSkillComponent
  );

  // Feeds
  fastify.get("/getFeeds", dataController.getFeeds);
  fastify.post("/addFeed", { preHandler: [verifyJWT] }, dataController.addFeed);
  fastify.put(
    "/updateFeed/:id",
    { preHandler: [verifyJWT] },
    dataController.editFeed
  );
  fastify.delete(
    "/deleteFeed/:id",
    { preHandler: [verifyJWT] },
    dataController.deleteFeed
  );
  fastify.post("/addLike", dataController.addLike);
  // fastify.post("/resetLikes", dataController.resetLikes);
  // Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/api/resetLikes" -Headers @{ "Content-Type" = "application/json" }

  // Admin Management
  fastify.post(
    "/setAdminCredentials",
    { preHandler: [verifyJWT] },
    dataController.setAdminCredentials
  );
  fastify.post("/compareAdminName", dataController.compareAdminName);
  fastify.post("/compareAdminPassword", dataController.compareAdminPassword);
  fastify.post("/compareOTP", dataController.compareOTP);
  fastify.get("/logout", dataController.logoutAdmin);

  fastify.get("/collection-counts", dataController.getCollectionCounts);

  // GitHub Stats routes
  fastify.get("/github-stats/top-langs", dataController.getTopLanguages);
  fastify.get("/top-langs", async (request, reply) => {
    // This route fetches an SVG from GitHub Readme Stats for the user's top languages
    const githubAPIUrl =
      "https://github-readme-stats.vercel.app/api/top-langs/?username=mrtopr&langs_count=8&layout=compact&theme=react&hide_border=true&bg_color=1F222E&title_color=F85D7F&icon_color=F8D866&hide=Jupyter%20Notebook,Roff";
    try {
      const fetch = (await import("node-fetch")).default;
      const response = await fetch(githubAPIUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from GitHub API: ${response.status}`
        );
      }
      const svg = await response.text();
      reply.header("Content-Type", "image/svg+xml").send(svg);
    } catch (error) {
      console.error("Error fetching GitHub stats:", error.message);
      reply.code(500).send("Failed to fetch GitHub stats");
    }
  });

  // fastify.get("/get-db-context", async (request, reply) => {
  //   try {
  //     const context = await getDbContextFile();
  //     reply.send(JSON.parse(context));
  //   } catch (error) {
  //     reply
  //       .code(500)
  //       .send({ message: "Error retrieving DB context", error: error.message });
  //   }
  // });

  // fastify.get("/get-github-context", async (request, reply) => {
  //   try {
  //     const context = await getGithubContextFile();
  //     reply.send(JSON.parse(context));
  //   } catch (error) {
  //     reply.code(500).send({
  //       message: "Error retrieving GitHub context",
  //       error: error.message,
  //     });
  //   }
  // });

  // fastify.get("/get-resume-context", async (request, reply) => {
  //   try {
  //     const context = await getResumeContextFile();
  //     reply.send(JSON.parse(context));
  //   } catch (error) {
  //     reply.code(500).send({
  //       message: "Error retrieving Resume context",
  //       error: error.message,
  //     });
  //   }
  // });

  // fastify.post("/get-relevant-context", async (request, reply) => {
  //   try {
  //     const { query, topK } = request.body;
  //     if (!query) {
  //       return reply.code(400).send({ message: "Query is required" });
  //     }
  //     const relevant = await getRelevantContext(query, topK || 5);
  //     reply.send({ relevant });
  //   } catch (error) {
  //     reply.code(500).send({
  //       message: "Error retrieving relevant context",
  //       error: error.message,
  //     });
  //   }
  // });

  // fastify.post("/ask-ai", async (request, reply) => {
  //   try {
  //     const { query } = request.body;
  //     if (!query) {
  //       return reply.code(400).send({ message: "Query is required" });
  //     }
  //     const answer = await askLLM(query);
  //     reply.send({ answer });
  //   } catch (error) {
  //     reply
  //       .code(500)
  //       .send({ message: "Error processing query", error: error.message });
  //   }
  // });
}

module.exports = dataRoutes;

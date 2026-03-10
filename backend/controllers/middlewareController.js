// controllers/middlewareController.js
const jwt = require("jsonwebtoken");

/**
 * Fastify preHandler middleware for verifying JWT from cookies.
 * If valid, attaches decoded token to request.user; otherwise sends an error.
 */
const verifyJWT = async (request, reply) => {
  const token = request.cookies.token;
  if (!token) {
    reply.code(401).send({ message: "No token provided" });
    return; // stop processing
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    reply.code(403).send({ message: "Failed to authenticate token" });
    return;
  }
  // If verification passed, function returns (allowing handler to run)
};

module.exports = verifyJWT;

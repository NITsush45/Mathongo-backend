const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL, {
  tls: {}, 
});

redis.on("connect", () => console.log("Redis client connected"));
redis.on("error", (err) => console.error("Redis connection error:", err));

module.exports = redis;

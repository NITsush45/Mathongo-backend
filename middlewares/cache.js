const redisClient = require('../config/redis');

module.exports = (expire = 3600) => {
  return async (req, res, next) => {
    const key = `chapters:${JSON.stringify(req.query)}`;
    
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      res.originalJson = res.json;
      res.json = (body) => {
        redisClient.setEx(key, expire, JSON.stringify(body));
        res.originalJson(body);
      };
      next();
    } catch (err) {
      next();
    }
  };
};
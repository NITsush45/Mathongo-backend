require('dotenv').config();
const app = require('./app');
const redis = require('../Mathon-go/config/redis');
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    //For Testing
    await redis.set('test-key', 'Hello Redis!');
    const result = await redis.get('test-key');
    console.log('Redis GET test-key:', result);
  } catch (err) {
    console.error('Redis error:', err);
  }
});

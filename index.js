const express = require('express');
const redis = require('redis');

const app = express();
let redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    port: 6379,
    host: 'redis'
  }
});

redisClient.connect().catch(console.error);
redisClient.on('error', err => {
  console.log('Error ' + err);
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
  redisClient.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    redisClient.set('visits', parseInt(visits) + 1);
  });
});

const port = 3000
app.listen(port, () => {
  console.log('listening on port 3000');
});

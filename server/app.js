const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const thumbsupply = require('thumbsupply');
const app = express();

const channelRouter = require('./routes/channel');
const videoRouter = require('./routes/video');

const videos = [
  {
    id: 0,
    poster: '/video/0/poster',
    duration: '3 mins',
    name: 'Sample 4'
  },
  {
    id: 1,
    poster: '/video/1/poster',
    duration: '4 mins',
    name: 'Sample 2'
  },
  {
    id: 2,
    poster: '/video/2/poster',
    duration: '2 mins',
    name: 'Sample 3'
  },
];

app.use(cors());

app.use('/channel', channelRouter);
app.use('/video', videoRouter);

app.get('/videos', (req, res) => res.json(videos));

app.listen(4000, () => {
  console.log('Listening on port 4000!')
});

module.exports = app;
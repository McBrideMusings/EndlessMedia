const express = require('express');
const router = express.Router();
const { PassThrough } = require('stream')
const fs = require("fs");

const serverStartTime = Date.now();

const urls = [
    'assets/0.mp4',
    'assets/1.mp4',
    'assets/2.mp4',
    'assets/3.mp4',
]

function combineStreams(streams) {
    const stream = new PassThrough()
    _combineStreams(streams, stream).catch((err) => stream.destroy(err))
    return stream
}

async function _combineStreams(sources, destination) {
    for (const stream of sources) {
        await new Promise((resolve, reject) => {
            stream.pipe(destination, { end: false })
            stream.on('end', resolve)
            stream.on('error', reject)
        })
    }
    destination.emit('end')
}

/* GET home page. */
router.get('/:id', async function (req, res, next) {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const serverUptimeInSeconds = (Date.now() - serverStartTime) / 1000; // time since server started in seconds
    const total = stat.size;
    const videoDurationInSeconds = 300; // You should replace this with the duration of your video in seconds.
    const videoPosition = serverUptimeInSeconds % videoDurationInSeconds;
    const startBytes = Math.floor((videoPosition / videoDurationInSeconds) * total);
    const endBytes = total - 1;

    res.writeHead(206, {
        'Content-Range': `bytes ${startBytes}-${endBytes}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': endBytes - startBytes + 1,
        'Content-Type': 'video/mp4'
    });

    const stream = fs.createReadStream(path, { start: startBytes, end: endBytes })
    stream.pipe(res);
});

module.exports = router;
var arDrone = require('ar-drone'),
    client = arDrone.createClient(),
    http = require('http');

console.log('Connecting to PNG stream ...');

var pngStream = client.getPngStream();

var lastPng;
pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        lastPng = pngBuffer;
    });

var server = http.createServer(function(req, res) {
    if (!lastPng) {
        res.writeHead(503);
        res.end('NO PNG dAtA');
        return;
    }

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(lastPng);
});

server.listen(4444, function() {
    console.log('Serving 44444 >>>>>');
});

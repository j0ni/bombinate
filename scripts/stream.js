var http = require('http'),
    dronestream = require('dronestream'),
    fs = require('fs'),
    server = http.createServer(function (req, res) {
      fs.createReadStream(__dirname + "/../html/stream.html").pipe(res);
    });

dronestream.listen(server);
server.listen(5555);

var http = require('http'),
    arDrone = require('ar-drone'),
    client  = arDrone.createClient(),
    // QRcodes = require('qrcode-emitter'),
    QRcodes = require('./qrcodeemitter'),
    dronestream = require('dronestream');

//console.log("starting http server..");
//var fs = require('fs'),
//    server = http.createServer(function (req, res) {
//        fs.createReadStream(__dirname + "/../html/stream.html").pipe(res);
//    });
//dronestream.listen(server);
//server.listen(5555);

client.config("video:video_channel", 3);

client.takeoff();

client
  .after(2000, function() {



  })
  .after(2000, function() {

    var pngStream = client.getPngStream();

    console.log("starting emitter..");

    var qrEmitter = new QRcodes(pngStream);


    qrEmitter.on('qrcode', function (code) {

      console.log("found one!: " + code);

      //self.emit('qrcode', code);
    });

    qrEmitter.start();

    pngStream.on('data', function(buf) {

      //console.log("streaming png..");
      //console.log(buf);

    });
  })
  .after(60000, function () {
    client.stop();
    client.land();
  });

//client.takeoff();

//client
//    .after(5000, function() {
//        this.clockwise(0.5);
//    })
//    .after(3000, function() {
//        this.stop();
//        this.land();
//    });

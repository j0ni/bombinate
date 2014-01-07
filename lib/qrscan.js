"use strict";

var QRcodes = require('./qrcodeemitter');

module.exports = function (client, callback) {
  client.config("video:video_channel", 3);

  var pngStream = client.getPngStream();

  console.log("starting emitter...");

  var qrEmitter = new QRcodes(pngStream);

  qrEmitter.on('qrcode', function (code) {
    qrEmitter.removeAllListeners();
    callback(null, code);
  });

  qrEmitter.start();
};

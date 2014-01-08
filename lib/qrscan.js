"use strict";

var QRcodes = require('./qrcodeemitter'),
    util = require('util');

module.exports = function (client, callback) {
  client.config("video:video_channel", 3);

  var pngStream = client.getPngStream();

  process.on('uncaughtException', function (err) {
    pngStream.end();
    console.error(util.inspect(err));
    process.exit(err);
  });

  console.log("starting emitter...");

  var qrEmitter = new QRcodes(pngStream);

  qrEmitter.on('qrcode', function (code) {
    qrEmitter.removeAllListeners();
    pngStream.end();
    callback(null, code);
  });

  qrEmitter.on('error', function (error) {
    console.log(util.inspect(error));
  });

  qrEmitter.start();
};

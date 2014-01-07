"use strict";

var travel = require('./lib/travel'),
    qrscan = require('./lib/qrscan'),
    arDrone = require('ar-drone'),
    client = arDrone.createClient();

client.takeoff();

qrscan(client, function (error, code) {
  travel(client, code, function (error, client, callback) {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    console.log("FTW!");
  });
});

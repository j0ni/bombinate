"use strict";

var travel = require('./lib/travel'),
    qrscan = require('./lib/qrscan'),
    arDrone = require('ar-drone'),
    client = arDrone.createClient();


process.on('exit', function () {
  stop();
  process.exit(0);
});

client.takeoff();

qrscan(client, function (error, code) {
  travel(client, code, function (error, client, callback) {
    if (error) {
      console.error(error);
      stop();
      process.exit(1);
    }

    stop();
    console.log("FTW!");
  });
});

function stop() {
  client.stop();
  client.land();
}


// travel(client, JSON.stringify({x:1,y:1}), function (error, client, callback) {
//   if (error) return console.error(error);
//   stop();
// });

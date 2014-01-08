"use strict";

var autonomy = require('ardrone-autonomy'),
    util = require('util');

module.exports = travel;

function travel(client, plan, search) {
  var planObject,
      mission,
      ctrl;

  search = search || function () {};

  try {
    planObject = JSON.parse(plan);
  } catch (e) {
    return search(e);
  }

  console.log(util.format("Flight plan: %s", plan));

  ctrl = autonomy.control(client);
  mission = new autonomy.Mission(client, ctrl);

  mission
    // .takeoff() // redundant
    // .hover(2000)
    // .zero()
    .go({x: planObject.x, y: planObject.y})
    .hover(2000)
    .taskSync(function () {
      search(null, client, travel);
    });

  mission.run(function (err, result) {
    if (err) {
      console.error(util.format("Couldn't travel to %d,%d: %s",
                                planObject.x, planObject.y, err));
      client.stop();
      client.land();
    }
  });
};

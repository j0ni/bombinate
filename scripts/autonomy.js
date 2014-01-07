var autonomy = require('ardrone-autonomy'),
    mission = autonomy.createMission();

mission
  .takeoff()
  .altitude(2)
  .forward(2)
  .left(2)
  .hover(2000)
  .land();

mission.run(function (err, result) {
  if (err) {
    console.trace("bloop %s", err.message);
    mission.client().stop();
    mission.client().land();
  } else {
    console.log("Mission accomplished!");
    process.exit(0);
  }
});

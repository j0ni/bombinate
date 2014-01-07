var autonomy = require('ardrone-autonomy'),
    mission = autonomy.createMission();

mission
  .takeoff()
  .altitude(2)
  .hover(5000)
  .zero()
  .go({x: 1, y: 1})
  .ccw(90)
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

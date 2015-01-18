var toggleWaypoint = $toward.waypoint({
  handler: function(direction) {
    $body
      .toggleClass("top--is-off", direction === "down")

    if ($topSliderConfig) {
      sliderLock = direction === "up";

      if ($topSliderConfig.currSlideId !== 0) {
        $topSliderConfig.goTo(0);
      }
    }
  }
});

var movedWaypoint = $toward.waypoint({
  handler: function(direction) {
    $body
      .toggleClass("top--is-moved", direction === "down");
  },
  offset: "35%"
});

var newsWaypoint = $news.waypoint({
  handler: function(direction) {
    $body
      .toggleClass("top--is-off", direction === "down")
      .toggleClass("top--is-on", direction === "up");

    sliderLock = direction === "up";

    if ($topSliderConfig.currSlideId !== 0) {
      $topSliderConfig.goTo(0);
    }
  }
});

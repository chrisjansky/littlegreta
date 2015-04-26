if (currentDevice === "desktop") {
  var toggleWaypoint = $toward.waypoint({
    handler: function(direction) {
      $body
        .toggleClass("top--is-off", direction === "down")

      if ($topSliderConfig) {
        sliderLock = direction === "up";

        if ($topSliderConfig.currSlideId !== 0) {
          $topSliderConfig.goTo(0);
        }

        if (sliderLock) {
          $topSliderConfig.stopAutoPlay();
        } else {
          $topSliderConfig.startAutoPlay();
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

  var portfolioWaypoint = $portfolio.waypoint({
    handler: function(direction) {
      if (direction === "down") {
        $workCarouselConfig.startAutoPlay();
      } else {
        $workCarouselConfig.stopAutoPlay();
      }
    }, offset: "25%"
  });
}

var
  $topSlider = $("[data-slider]"),
  $workCarousel = $("[data-carousel]");

var
  sliderLock = true;

$topSlider.royalSlider({
  addActiveClass: true,
  controlNavigation: "none",
  imageScaleMode: "fill",
  slidesSpacing: 0,
  loopRewind: true,
  
  numImagesToPreload: 1,
});

$workCarousel.royalSlider({
  addActiveClass: true,
  controlNavigation: "none",
  imageScaleMode: "fill",
  slidesSpacing: 0,
  loopRewind: true,
  
  keyboardNavEnabled: true,
  visibleNearby: {
    enabled: true,
    center: false,
    centerArea: .8,
    navigateByCenterClick: true,

    breakpoint: 980,
    breakpointCenterArea: 1
  }
});

var
  $topSliderConfig = $topSlider.data("royalSlider"),
  $workCarouselConfig = $workCarousel.data("royalSlider");

if ($workCarouselConfig) {
  // Remove class if just moved from the last slide.
  $workCarouselConfig.ev.on("rsBeforeAnimStart", function(event) {
    var
      fromEnd = event.target._prevSlideId == event.target.numSlides - 1

    if (fromEnd) {
      $portfolio.removeClass("carousel--at-end");
    }
  });

  // Add class if now sliding to the last slide.
  $workCarouselConfig.ev.on("rsAfterSlideChange", function(event) {
    var
      atEnd = event.target.currSlideId == event.target.numSlides - 1

    $portfolio.toggleClass("carousel--at-end", atEnd);
  });
}

// Custom keyboard nav for topSlider
$(document.documentElement).on("keydown", function(event) {
  var
    pressedKey = event.keyCode;

  if (pressedKey === 37 && !sliderLock) {
    $topSliderConfig.prev();
  } else if (pressedKey === 39 && !sliderLock) {
    $topSliderConfig.next();
  }
});
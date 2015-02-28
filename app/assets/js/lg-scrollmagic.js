function lgScrollMagic() {
  
  // Initialize
  var
    elScroll = document.getElementById("js-scrollmagic"),
    scrollDuration,
    scrollLength;

  // Fetch parameters from DOM
  this.setup = function() {
    // Multiply to balance the easing
    scrollDuration = parseInt($toward.css("margin-top"));
    scrollLength = elScroll.offsetHeight;
  }
  // Fetch on init
  this.setup();

  function getDuration() {
    return scrollDuration;
  }

  var scrollController = new ScrollMagic({
    globalSceneOptions: {
      triggerHook: 0,
      duration: getDuration
    }
  });

  var homeScene = new ScrollScene({
    triggerElement: null
  });

  var
    scrollTween,
    // blockerTween,
    homeScene,
    homeTimeline;

  this.build = function() {
    homeTimeline = new TimelineMax();
  }

  // Attach to controller
  this.attach = function(createTween) {
    
    if (createTween) {
      scrollTween = TweenMax.to(elScroll, 1, {
        css: {transform: "translate3d(0, " + -scrollLength + "px, 0)"}, ease: Linear.easeNone
      });

      homeScene
        .addTo(scrollController);
    } else {
      scrollTween.progress(0);

      scrollTween.updateTo({
        css: {
          transform: "translate3d(0, " + -scrollLength + "px, 0)"
        }
      }, true);
    }

    homeTimeline.add([scrollTween]);

    homeScene
      .setTween(homeTimeline);
  }
  // End attaching

}

// Run it!
var introParallax = new lgScrollMagic();

$(document).on("ready", function() {
  if (currentDevice === "desktop") {
    $body.addClass("scrollmagic--is-on");

    introParallax.build();
      
    introParallax.attach(true);
  }
});

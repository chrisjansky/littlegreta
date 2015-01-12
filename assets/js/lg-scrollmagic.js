function lgScrollMagic() {
  
  // Initialize
  var
    elScroll = document.getElementById("js-scrollmagic"),
    elFog = document.getElementById("js-fog"),
    scrollDuration,
    scrollLength;

  // Fetch parameters from DOM
  this.setup = function() {
    // Multiply to balance the easing
    scrollDuration = parseInt($news.css("margin-top"));
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
    fogTween,
    homeScene,
    homeTimeline;

  this.build = function() {
    homeTimeline = new TimelineMax();

    fogTween = TweenMax.fromTo(elFog, .75, 
      {
        css: {opacity: 1, display: "block"}, ease: Linear.easeNone
      },
      {
        css: {opacity: 0, display: "none"}, ease: Linear.easeNone
      });
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

    homeTimeline.add([scrollTween, fogTween]);

    homeScene
      .setTween(homeTimeline);

      // .addIndicators({
      //   zindex: 500,
      //   colorStart: "yellow"
      // });
  }
  // End attaching

}

// Run it!
var newsParallax = new lgScrollMagic();

$(document).on("ready", function() {
  newsParallax.build();

  newsParallax.attach(true);
});

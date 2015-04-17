$(window).on("resize orientationchange", function() {

  clearTimeout(this.id);

  this.id = setTimeout(function() {
    
    if (currentDevice === "desktop") {
      // Get parallax units again
      introParallax.setup();
      // Update tweens
      introParallax.attach(false);
    }

    heightFix();

  }, durBasic)

});

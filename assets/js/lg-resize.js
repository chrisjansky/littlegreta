$(window).on("resize orientationchange", function() {

  clearTimeout(this.id);

  this.id = setTimeout(function() {
    // Get parallax units again
    introParallax.setup();
    // Update tweens
    introParallax.attach(false);

  }, durBasic)

});

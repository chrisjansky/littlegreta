$(window).on("resize orientationchange", function() {

  clearTimeout(this.id);

  this.id = setTimeout(function() {
    // Get parallax units again
    newsParallax.setup();
    // Update tweens
    newsParallax.attach(false);

  }, durBasic)

});

module.exports = {
  attach: (function instance() {
    var toggleObj = document.querySelectorAll('[data-toggle]');

    for (var i = 0; i < toggleObj.length; i++) {
      toggleObj[i].onclick = function() {
        var classAttr = this.getAttribute('data-toggle');

        document.body.classList.toggle(classAttr + '--is-active');
      }
    }

    var barbaLinks = document.querySelectorAll('[data-barba="reload"]');
    barbaLinks.forEach(function(element) {
      element.addEventListener('click', function() {
        document.body.classList.remove('menu--is-active');
      })
    });

    var playLinks = document.querySelectorAll('[data-play]');
    playLinks.forEach(function(element) {
      element.addEventListener('click', function() {
        var target = document.getElementById(element.dataset.play);
        var player = new Vimeo.Player(target);

        player.play();
      })
    });

    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
}

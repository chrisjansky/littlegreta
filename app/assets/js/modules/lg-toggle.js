module.exports = {
  attach: (function instance() {
    var toggleObj = document.querySelectorAll('[data-toggle]');

    for (var i = 0; i < toggleObj.length; i++) {
      toggleObj[i].onclick = function() {
        var classAttr = this.getAttribute('data-toggle');

        document.body.classList.toggle(classAttr + '--is-active');
      }
    }

    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
}

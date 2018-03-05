module.exports = {
  init: (function instance() {
    new Headroom(document.getElementById("js-headroom")).init();

    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
}

module.exports = {
  init: (function instance() {
    var headroomEl = document.getElementById("js-headroom");

    if (headroomEl !== null) {
      new Headroom(headroomEl).init();
    }

    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
}

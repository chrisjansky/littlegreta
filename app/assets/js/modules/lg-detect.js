module.exports = {
  init: (function instance() {
    /* Device class */
    if ("ontouchstart" in document.documentElement) {
      document.body.classList.add("device--is-mobile");
    } else {
      document.body.classList.add("device--is-desktop");
    }

    return instance;
  })()
};

module.exports = {
  init: (function instance() {
    inView('[data-inview]').on('enter', function(element) {
      element.classList.add('is--in-view');
    });
  
    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
}

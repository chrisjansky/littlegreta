module.exports = {
  init: (function instance() {
    inView('[data-inview]').on('enter', function(element) {
      element.classList.add('is--in-view');
    });

    inView('[data-present="container"]')
    .on('enter', function(element) {
      element.classList.add('is--present');
    })
    .on('exit', function(element) {
      element.classList.remove('is--present');
    });

    /* Return to make later calls possible */
    return instance;
  /* Auto run */
  })()
};

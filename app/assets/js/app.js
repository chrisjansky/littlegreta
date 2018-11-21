/* Store for later and initialize inside */
var
  lgHeadroom = require('./modules/lg-headroom.js'),
  lgLazy = require('./modules/lg-lazyload.js'),
  lgInview = require('./modules/lg-inview.js'),
  lgToggle = require('./modules/lg-toggle.js');

/* Barba.js */
Barba.Pjax.init();
Barba.Prefetch.init();

var barbaClicked = false;

Barba.Dispatcher.on('linkClicked', function() {
  barbaClicked = true;
});

addEventListener('popstate', function (event) {
  barbaClicked = false;
});

/* Event based here */
Barba.Dispatcher.on('newPageReady', function() {
  lgLazy.init();
  lgInview.init();
  lgToggle.attach();
});

/* Direct DOM manupulation here */
Barba.Dispatcher.on('transitionCompleted', function() {
  lgHeadroom.init();

  /* Don't change scroll position if back button pressed */
  if (barbaClicked) {
    window.scroll({
      top: 0,
      behaviour: 'smooth'
    });
  }
});

var lgTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.exit()])
      .then(this.enter.bind(this));
  },
  exit: function() {
    var container = this.oldContainer;

    this.oldContainer.classList.toggle('page--exit');

    return new Promise(function(resolve, reject) {
      container.addEventListener('transitionend', function() {
        resolve();
      });
    });
  },
  enter: function() {
    var instance = this;

    instance.newContainer.classList.toggle('page--enter');

    /* After $duration--l has passed */
    setTimeout(function() {
      instance.newContainer.classList.remove('page--enter');
    }, 500);

    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  return lgTransition;
};

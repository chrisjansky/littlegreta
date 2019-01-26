var twoObj, instance;

module.exports = {
  render: (function render() {
    var markEl = document.querySelectorAll("[data-mark]");
    markEl.forEach(function(instance) {
      var elToPrepend = document.createElement("span");
      instance.prepend(elToPrepend);
    });

    instance = document.querySelector("[data-ruscha]");

    if (instance !== null) {
      var colors = instance.dataset.ruscha.split(", ");
      var orb = instance.dataset.orb.split(", ");
      colors.index = 0;

      var blurW = instance.offsetWidth;
      var blurH = instance.offsetHeight;

      twoObj = new Two({
        type: Two.Types.svg,
        width: blurW,
        height: blurH,
        autostart: true
      }).appendTo(instance);

      new Waypoint.Inview({
        element: instance,
        enter: function(direction) {
          twoObj.play();
        },
        exited: function(direction) {
          twoObj.pause();
        }
      });

      var linearGradient = twoObj.makeLinearGradient(
        twoObj.width / 2, - twoObj.height / 2,
        twoObj.width / 2, twoObj.height / 2,
        new Two.Stop(0, colors[0]),
        new Two.Stop(1, colors[1]),
        new Two.Stop(1, colors[2])
      );

      var rectangle = twoObj.makeRectangle(twoObj.width / 2, twoObj.height / 2, twoObj.width, twoObj.height);
      rectangle.noStroke();

      rectangle.fill = linearGradient;

      var radius = Math.max(twoObj.width, twoObj.height);
      var radialGradient = twoObj.makeRadialGradient(
        0, 0,
        radius,
        new Two.Stop(0.25, orb[0], 1),
        new Two.Stop(0.75, orb[1], 0)
      );

      var vignette = twoObj.makeRectangle(twoObj.width / 2, twoObj.height / 2, twoObj.width, twoObj.height);
      vignette.noStroke();

      vignette.fill = radialGradient;

      var mouse = new Two.Vector(twoObj.width / 2, twoObj.height / 2);
      var destination = new Two.Vector();

    window.addEventListener('resize', function(e) {
      blurW = instance.offsetWidth;
      blurH = instance.offsetHeight;

      twoObj.trigger('resize');
    });
    window.addEventListener('mousemove', function(e) {
      mouse.set(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', function(e) {
      e.preventDefault();
      var touch = e.originalEvent.changedTouches[0];
      mouse.set(touch.pageX, touch.pageY);
      return false;
    });

    twoObj
      .bind('resize', function() {
        twoObj.renderer.setSize(blurW,blurH);

        var w = twoObj.renderer.width / 2;
        var h = twoObj.renderer.height / 2;

        linearGradient.left.y = - h;
        linearGradient.right.y = h;

        rectangle.vertices[0].set(- w, - h);
        rectangle.vertices[1].set(w, - h);
        rectangle.vertices[2].set(w, h);
        rectangle.vertices[3].set(- w, h);

        vignette.vertices[0].copy(rectangle.vertices[0]);
        vignette.vertices[1].copy(rectangle.vertices[1]);
        vignette.vertices[2].copy(rectangle.vertices[2]);
        vignette.vertices[3].copy(rectangle.vertices[3]);

        rectangle.translation.set(w, h);
        vignette.translation.copy(rectangle.translation);

        radius = Math.max(twoObj.width, twoObj.height);
      })
      .bind('update', function(frameCount) {
        radialGradient.radius = (radius / 4) * (Math.sin(frameCount / 60) + 1) / 2 + radius * 0.75;

        destination.set(
          mouse.x - twoObj.width / 2,
          mouse.y - twoObj.height / 2
        );
        radialGradient.center.addSelf(
          destination
            .subSelf(radialGradient.center)
            .multiplyScalar(0.1)
        );
        radialGradient.focal.copy(
          radialGradient.center.multiplyScalar(0.75)
        );

        var o = linearGradient.stops[1].offset;

        if (o < 0.001) {
          linearGradient.stops[1].offset = 1;
          colors.index = (colors.index + 1) % colors.length;
          for (var i = 0; i < linearGradient.stops.length; i++) {
            linearGradient.stops[i].color = colors[(colors.index + i) % colors.length];
          }
          return;
        }

        linearGradient.stops[1].offset -= o * 0.050;
      });
    }

    return render;
  })(),
  destroy: function() {
    if (instance !== null) {
      twoObj.unbind(null);
    }
  }
};

var colors = [
  'rgb(255, 64, 64)',
  'rgb(255, 128, 0)',
  'rgb(0, 200, 255)',
  'rgb(0, 191, 168)',
  'rgb(153, 102, 255)',
  'rgb(255, 244, 95)'
];
colors.index = 0;

module.exports = {
  render: (function render() {
    var instance = document.querySelector("[data-blur]");
    if (instance !== null) {
      var blurW = instance.offsetWidth;
      var blurH = instance.offsetHeight;

      var blurColors = instance.dataset.blur.split(",");

      window.two = new Two({
        type: Two.Types.svg,
        width: blurW,
        height: blurH,
        autostart: true
      }).appendTo(instance);

      new Waypoint.Inview({
        element: instance,
        enter: function(direction) {
          window.two.play();
        },
        exited: function(direction) {
          window.two.pause();
        }
      });

      var linearGradient = window.two.makeLinearGradient(
        window.two.width / 2, - window.two.height / 2,
        window.two.width / 2, window.two.height / 2,
        new Two.Stop(0, colors[0]),
        new Two.Stop(1, colors[1]),
        new Two.Stop(1, colors[2])
      );

      var rectangle = window.two.makeRectangle(window.two.width / 2, window.two.height / 2, window.two.width, window.two.height);
      rectangle.noStroke();

      rectangle.fill = linearGradient;

      var radius = Math.max(window.two.width, window.two.height);
      var radialGradient = window.two.makeRadialGradient(
        0, 0,
        radius,
        new Two.Stop(0, blurColors[0], 1),
        new Two.Stop(0.5, blurColors[1], 0)
      );

      var vignette = window.two.makeRectangle(window.two.width / 2, window.two.height / 2, window.two.width, window.two.height);
      vignette.noStroke();

      vignette.fill = radialGradient;

      var mouse = new Two.Vector(window.two.width / 2, window.two.height / 2);
      var destination = new Two.Vector();

    $(window)
      .bind('resize', function(e) {
        blurW = instance.offsetWidth;
        blurH = instance.offsetHeight;

        window.two.trigger('resize');
      })
      .bind('mousemove', function(e) {
        mouse.set(e.clientX, e.clientY);
      })
      .bind('touchmove', function(e) {
        e.preventDefault();
        var touch = e.originalEvent.changedTouches[0];
        mouse.set(touch.pageX, touch.pageY);
        return false;
      });

    window.two
      .bind('resize', function() {
        window.two.renderer.setSize(blurW,blurH);

        var w = window.two.renderer.width / 2;
        var h = window.two.renderer.height / 2;

        linearGradient.left.y = -h;
        linearGradient.right.y = h;

        rectangle.vertices[0].set(-w, -h);
        rectangle.vertices[1].set(w, -h);
        rectangle.vertices[2].set(w, h);
        rectangle.vertices[3].set(-w, h);

        vignette.vertices[0].copy(rectangle.vertices[0]);
        vignette.vertices[1].copy(rectangle.vertices[1]);
        vignette.vertices[2].copy(rectangle.vertices[2]);
        vignette.vertices[3].copy(rectangle.vertices[3]);

        rectangle.translation.set(w, h);
        vignette.translation.copy(rectangle.translation);

        radius = Math.max(window.two.width, window.two.height);

      })
      .bind('update', function(frameCount) {
        radialGradient.radius = (radius / 4) * (Math.sin(frameCount / 60) + 1) / 2 + radius * 0.75;

        destination.set(
          mouse.x - window.two.width / 2,
          mouse.y - window.two.height / 2
        );
        radialGradient.center.addSelf(
          destination
            .subSelf(radialGradient.center)
            .multiplyScalar(0.125)
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

        linearGradient.stops[1].offset -= o * 0.025;
      });
    }

    return render;
  })()
};

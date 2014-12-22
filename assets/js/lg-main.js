var
  durShort = 250,
  durBasic = 500,
  durLong = 750

$(document).on("ready", function() {

  var
    $body = $("body")

  if (isDesktop()) {

    var newsWaypoint = $("body").waypoint({
      handler: function(direction) {
        $(this.element)
          .toggleClass("top--is-off", direction === "down")
          .toggleClass("top--is-on", direction === "up");
      },
      offset: function() {
        return -Waypoint.viewportHeight() * .20
      }
    })

  }

  var
    $packeryContainer = $("[data-packery]"),
    $packeryItems = $("[data-packery-item]")

  $packeryContainer.packery({
    itemSelector: "[data-packery-item]"
  });

  $packeryItems.on("click", function() {
    $(this).toggleClass("o-person--big");
    $(this).siblings().removeClass("o-person--big");
    $packeryContainer.packery();
  });

});
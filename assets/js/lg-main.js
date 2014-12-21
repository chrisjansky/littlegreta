var
  durShort = 250,
  durBasic = 500,
  durLong = 750

$(document).on("ready", function() {

  var
    $body = $("body")

  if (!Modernizr.touch) {
    $body
      .waypoint(function(direction) {
        $body
          .toggleClass("top--is-off", direction === "down")
          .toggleClass("top--is-on", direction !== "down");
      },
      {
        offset: -250
        // function() {
          // return -Math.round(($.waypoints("viewportHeight") * .15));
        // }
      });
  }

});
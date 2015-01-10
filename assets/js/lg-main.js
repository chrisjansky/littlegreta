var
  durShort = 250,
  durBasic = 500,
  durLong = 750

$(document).on("ready", function() {

  var
    $body = $("body")

  if (isDesktop()) {

    // var newsWaypoint = $("body").waypoint({
    //   handler: function(direction) {
    //     $(this.element)
    //       .toggleClass("top--is-off", direction === "down")
    //       .toggleClass("top--is-on", direction === "up");
    //   },
    //   offset: function() {
    //     return -Waypoint.viewportHeight() * .20
    //   }
    // });

  }

  // var
    // $packeryContainer = $("[data-packery]");
    // $packeryItems = $("[data-packery-item]")

  // $packeryContainer.packery({
  //   itemSelector: "article",
  //   columnWidth: ".m-blog__sizer"
  // });

  // $packeryItems.on("click", function() {
  //   $(this).toggleClass("o-person--big");
  //   $(this).siblings().removeClass("o-person--big");
  //   $packeryContainer.packery();
  // });

});

function randomOrder(container) {
  $(container).children().sort(function() {
    return Math.round(Math.random()) - 0.5;
  }).each(function() {
    $(this).appendTo(container);
  });
}

function blogPack() {
  setTimeout(function() {
    // randomOrder("[data-packery]");
    // var packeryGutter = $(".m-blog__sizer")
    // console.log($(".m-blog__sizer").css("margin-right"));
    // var sizer = document.getElementById("js-sizer");
    // console.log(window.getComputedStyle(sizer, null).getPropertyValue("margin"));

    $("[data-packery]").packery({
      itemSelector: "article",
      columnWidth: ".m-blog__sizer",
      gutter: ".m-blog__gutter"
    });
  }, 1500);
}

$("[data-tumblr]").embedTumblr("http://api.tumblr.com/v2/blog/littlegreta.tumblr.com/posts?api_key=BMN8cE6TkdzbSl7d9SzeI5xE63PegAMMPNgtTYP42Cr1sAaxkT");

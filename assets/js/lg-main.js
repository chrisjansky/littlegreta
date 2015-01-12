// $(document).on("ready", function() {
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
// });

function blogPack() {
  $feed.imagesLoaded(function() {
    $feed.masonry({
      itemSelector: ".o-media",
      columnWidth: ".m-blog__sizer",
      gutter: ".m-blog__gutter"
    });
  });
}

$("[data-tumblr]").embedTumblr("http://api.tumblr.com/v2/blog/littlegreta.tumblr.com/posts?api_key=BMN8cE6TkdzbSl7d9SzeI5xE63PegAMMPNgtTYP42Cr1sAaxkT");

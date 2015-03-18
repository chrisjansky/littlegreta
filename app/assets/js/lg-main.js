function blogMason() {
  $feed.imagesLoaded(function() {
    $feed.masonry({
      itemSelector: ".o-media",
      columnWidth: "[data-column]",
      gutter: "[data-gutter]"
    });

    // If hash present, scroll to it
    checkHash();
  });
}

$("[data-tumblr]").embedTumblr("http://api.tumblr.com/v2/blog/littlegreta.tumblr.com/posts?api_key=BMN8cE6TkdzbSl7d9SzeI5xE63PegAMMPNgtTYP42Cr1sAaxkT");

$("[data-masonry]").imagesLoaded(function() {
  $("[data-masonry]").masonry({
    itemSelector: "[data-masonry-item]",
    columnWidth: "[data-column]",
    gutter: "[data-gutter]"
  });
});

var currentDevice;

if (isDesktop()) {
  currentDevice = "desktop";

  $body.addClass("device--is-desktop");
} else {
  currentDevice = "mobile";

  $body.addClass("device--is-mobile");
}

// Initialize fastclick
if ("addEventListener" in document) {
  document.addEventListener("DOMContentLoaded", function() {
    FastClick.attach(document.body);
  }, false);
}

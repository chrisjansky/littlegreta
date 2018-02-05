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

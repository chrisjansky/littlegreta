// Scroll to anchor.
$("[data-scrollto]").click(function(event) {
  event.preventDefault();

  var
    $target = $($(this).attr("href")),
    $scrollPos = $(this).data("scrollto"),
    $targetOffset = $target.offset().top,
    $targetHeight = $target.height(),
    viewHeight = window.innerHeight,
    destination;

  // Scroll to middle if larger than viewport, else to top of it
  if ($targetHeight > viewHeight && $scrollPos === "center") {
    destination = ($targetHeight - viewHeight) / 2 + $targetOffset;
  } else {
    // +1 to trigger waypoint
    destination = $targetOffset + 1;
  }

  $("html, body").animate({
    scrollTop: destination
  }, durBasic);
});

// Executed by blogMason()
function checkHash() {
  if (location.hash) {
    var smoothScrollTo = "#" + location.hash.slice(9)

    $("html, body").animate({
      scrollTop: $(smoothScrollTo).offset().top
    }, durBasic);
  }
}

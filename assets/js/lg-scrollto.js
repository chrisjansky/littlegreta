// Scroll to anchor.
$("[data-scrollto]").click(function(event) {
  event.preventDefault();

  var
    $target = $($(this).attr("href")),
    $targetOffset = $target.offset().top,
    $targetHeight = $target.height(),
    viewHeight = window.innerHeight,
    destination = ($targetHeight - viewHeight) / 2 + $targetOffset;

  $("html, body").animate({
    scrollTop: destination
  }, durBasic);
});

$("[data-logo]").click(function(event) {
  event.preventDefault();

  $("html, body").animate({
    scrollTop: 0
  }, durBasic, transFastOut);
});

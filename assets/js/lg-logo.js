$("[data-logo]").click(function(event) {

  if ($body.hasClass("top--is-off")) {
    event.preventDefault();

    $("html, body").animate({
      scrollTop: 0
    }, durBasic, transFastOut);
  }
  
});

function heightFix() {
  var viewHeight = window.innerHeight;

  $(".js-height-fix").each(function(index, element) {
    var
      $el = $(element),
      elMultiplier = $el.data("height"),
      newHeight = Math.round(viewHeight * elMultiplier);

    $(element).css("height", newHeight);
  });
}

heightFix();

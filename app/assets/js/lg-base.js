var
  durShort = 250,
  durBasic = 500,
  durLong = 750;

var
  transBasic = "easeInOutCubic",
  transFastOut = "easeOutQuint"

jQuery.easing.def = transBasic;

var
  $body = $("body"),
  $toward = $("[data-toward]"),
  $portfolio = $("[data-portfolio]"),
  $feed = $("[data-feed]");
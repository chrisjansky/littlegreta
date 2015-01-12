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
  $news = $("[data-news]"),
  $portfolio = $("[data-portfolio]"),
  $feed = $("[data-feed]");

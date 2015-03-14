// jQuery hover.
if (currentDevice === "mobile") {
  $("[data-hover]")
    .on("click", function() {
      $(this)
        .toggleClass("hover--is-active")
        .siblings().removeClass("hover--is-active");
    });
}

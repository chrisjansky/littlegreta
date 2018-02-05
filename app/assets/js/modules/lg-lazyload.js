module.exports = function() {
  var loadImages = new LazyLoad({
    elements_selector: '[data-src]',
    data_src: 'src',
    callback_load: function(element) {
      element.parentNode.classList.add("image--is-loaded");
    }
  });
}

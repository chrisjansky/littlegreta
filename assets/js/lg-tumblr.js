/*
jQuery plugin for read-only Tumblr API implementation.
For more info on the Tumblr API, please visit http://www.tumblr.com/docs/en/api/v2
2011 ian.ainley (@ gmail)
*/

;(function ($) {

$.fn.getTumblrPosts = function (APIKey, options) {
  return $.fn.getTumblrPosts.init(this, APIKey, options);
}

$.fn.getTumblrPosts.defaults = {
  postsPerPage: 6,
  pagination: false,
  currentPage: 1,
  loading: "<div class='spinner'>Please wait</div>",
  previousBtn: "<div class='prev'>&laquo; Prev</div>",
  nextBtn: "<div class='next'>Next &raquo;</div>",
  error: "<h2>Error!</h2><p>There was an error accessing the Tumblr API, LAME!</p>"
}

$.fn.getTumblrPosts.obj = {

  /*** POSTS ***/
  formatPosts : function (blog, data) {
    var s = this;
    var count = 0;
    $.each(data.response.posts, function () {
  
      var postType = this.type,
        thisPost = $("<div class='m-post'/>"),
        thisCont = $("<div class='m-post__content'/>"),
        thisInfo = $("<div class='m-post__info'/>"),
//                postDate = s.formatedPostDate(this.timestamp),
        postDate = this.timestamp,
        linkURL = this.post_url;

//        count = count + 1;
        thisPost.show();
//        thisPost.delay(count).fadeIn(100);

      switch (postType) {
  
        /*** LINK POST ***/
        case "link":

          thisInfo.append(
            '<small class="m-post__date" data-livestamp="' + postDate + '">' + '</small>'
          );
          thisCont.append(
            '<a class="m-post__link" href="' + linkURL + '" target="_blank"><h4 class="m-post__title"><span>' + title + '</span></h4></a>',
            thisInfo
          );
          thisPost.addClass('m-post--link').append(thisCont);
          blog.append(thisPost);
          break; /*** END LINK POST***/

      /*** AUDIO POST ***/
      case "audio":
        var title = 'AUDIO: ' + this.artist + ' - ' + this.track_name;
        
        thisInfo.append(
          '<a class="btn" href="' + linkURL + '" target="_blank">Hear on Tumblr</a>',
          '<small class="m-post__date" data-livestamp="' + postDate + '">' + '</small>'
        );
        thisCont.append(
          '<a class="m-post__link" href="' + linkURL + '" target="_blank"><h4 class="m-post__title"><span>' + title + '</span></h4></a>',
          thisInfo
        );
        thisPost.addClass('m-post--audio').append(thisCont);
        blog.append(thisPost);
        break; /*** END AUDIO POST***/

      /*** TEXT POST ***/
      case "text":
        var title = this.title;
        
        thisCont.append(
          '<a class="m-post__link" href="' + linkURL + '" target="_blank"><h4 class="m-post__title"><span>' + title + '</span></h4></a>'
        );
        thisInfo.append(
          '<a class="btn" href="' + linkURL + '" target="_blank">Read More on Tumblr</a>',
          '<small class="m-post__date" data-livestamp="' + postDate + '">' + '</small>'
        );
        thisPost.addClass('m-post--text')
            .append(
                thisCont,
                thisInfo
              );
        blog.append(thisPost);
        break; /*** END TEXT POST***/

      /*** PHOTO POST ***/
      case "photo":
        var photoText = $(this.caption).text(),
          photos = this.photos,
          photoContainer = $('<div class="m-post__photos" />');

        // Check for photo size options. Prevents really large original images from being called.
        if (photos[0].alt_sizes[0].width >= 500) {
          var n = 0;
          for ( ; n < photos[0].alt_sizes.length; n++) {
            if (photos[0].alt_sizes[n].width === 500) {
              var photoSizeURL = photos[0].alt_sizes[n].url;
            }
          }
        } else {
          var photoSizeURL = photos[0].original_size.url;
        }
        photoContainer.append('<a class="m-post__link" href="' + linkURL + '" target="_blank" title="' + photos[0].caption + '"><span class="m-post__overlay"><h4 class="m-post__title"><span>' + photoText + '</span></h4><div class="m-post__info"><span class="btn">View on Tumblr</span><small class="m-post__date" data-livestamp="' + postDate + '">' + '</small></div></span><img src="' + photoSizeURL + '"/></a>');
        thisPost.addClass('m-post--photo')
            .append(
                photoContainer
                 );
        blog.append(thisPost);
        break; /*** END PHOTO POST***/

      /*** QUOTE POST ***/
      case "quote":
        var quote = this.text,
          author = this.source;

        thisInfo.append(
          '<a class="btn" href="' + linkURL + '" target="_blank">Read More on Tumblr</a>',
          '<small class="m-post__author"> &#8212; ' + author + '</small>',
          '<small class="m-post__date" data-livestamp="' + postDate + '">' + '</small>'
        );
        thisCont.append('<a class="m-post__link" href="' + linkURL + '" target="_blank"><q class="m-post__title"><span>' + quote + '</span></q></a>');
        thisCont.wrapInner('<div class="pad"></div>');
        thisPost.addClass('m-post--quote')
            .append(
              thisCont,
              // '<div class="m-post__author"> &#8212; ' + author + '</div>',
              thisInfo
            );
//                thisPost.addClass('quote-post').append('<p class="post-date">' + postDate + '</p>', '<q class="quote-text">' + quote + '</q>', '<p class="quote-author"> &#8212; ' + author + '</p>', '<a class="tumblr-link" href="' + linkURL + '">View on Tumblr</a>');
        blog.append(thisPost);
        break; /*** END QUOTE POST***/


      /*** VIDEO POST ***/
      case "video":
        var caption = $(this.caption).text();
//                    embeddedVideo = this.player[2].embed_code;

        thisInfo.append(
          '<a class="btn" href="' + linkURL + '" target="_blank">Watch Video on Tumblr</a>',
          '<small class="m-post__date" data-livestamp="' + postDate + '">' + '</small>'
        );
        thisCont.append(
          '<a class="m-post__link" href="' + linkURL + '" target="_blank"><h4 class="m-post__title"><span>' + caption + '</span></h4></a>'
//              '<a href="' + linkURL + '"><img src="'+ this.thumbnail_url +'" /></a>'
        );
//                thisCont.wrapInner('<div class="pad"></div>');
        thisPost.addClass('m-post--video')
            .append(
                thisCont,
                thisInfo
              );
        blog.append(thisPost);
        break; /*** END VIDEO POST ***/

      
      }
    });
  }, /*** END POSTS ***/
} /*** END OBJ ***/

$.fn.getTumblrPosts.init = function (target, APIKey, options) {
  var blog = target,
    settings = $.extend({}, $.fn.getTumblrPosts.defaults, options),
    ppPage = settings.postsPerPage,
    currentPage = settings.currentPage;

  blog.html("");

  $.ajax({
    url: APIKey + "&limit=" + ppPage + "&offset=" + (currentPage - 1) * ppPage,
    dataType: "jsonp",
    jsonp: "&jsonp",
    beforeSend: function () {
      blog.html(settings.loading); // While Loading...
    },
    success: function (data) {
      blog.html("");

      $.fn.getTumblrPosts.obj.formatPosts(blog, data);

      /*** PAGINATION ***/
      if (settings.pagination === true) {
        var paginationContainer = $("<div class='blog-pagination clearfix'></div>");

           if (Math.ceil(data.response.total_posts / ppPage) != currentPage) {
             var nextBtn = $("<div class='blog-next-btn'>" + settings.nextBtn + "</div>").css({
               "cursor": "pointer"
             });
             paginationContainer.append(nextBtn);
           }
           if (currentPage !== 1) {
             var prevBtn = $("<div class='blog-prev-btn'>" + settings.previousBtn + "</div>").css({
               "cursor": "pointer"
             });
             paginationContainer.append(prevBtn);
           }

           function bindPagination() {
             $(".blog-next-btn").click(function () {
               $.fn.getTumblrPosts.defaults.currentPage++;
               blog.getTumblrPosts(APIKey, options);
             });
             $(".blog-prev-btn").click(function () {
               $.fn.getTumblrPosts.defaults.currentPage--;
               blog.getTumblrPosts(APIKey, options);
             });
        }
        blog.append(paginationContainer);
        bindPagination();
      } /*** END PAGINATION ***/
         
    },/*** END SUCCESS ***/

    error: function () {
      blog.append(settings.error);
    }
  });
}

})(jQuery);

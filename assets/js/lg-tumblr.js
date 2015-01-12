/*
Original: https://github.com/Iaaan/jQuery-plugin-for-Tumblr-API
Removed pagination; audio post, deleted loading crap replacing blog.html()
*/

;(function ($) {

$.fn.embedTumblr = function (APIKey, options) {
  return this.each(function(){
    var target = $(this);

    if (target.data("embedTumblr")) {
      return;
    }

    var tumblrPosts = new AccessTumlbrApi(target, APIKey, options);

    target.data('embedTumblr', tumblrPosts);

    tumblrPosts.init();
  });
};

$.fn.embedTumblr.defaults = {
  postsPerPage: 3,
  error: "<p>There was an error accessing the Tumblr API, sorry!</p>"
};

function AccessTumlbrApi(target, APIKey, options) {
  var s = this;

  s.settings = $.extend({}, $.fn.embedTumblr.defaults, options);

  /*** POSTS ***/
  var formatPosts = function (blog, data) {
    var loopContainer = $("<div />");
     
    $.each(data.response.posts, function () {
      var postType = this.type,
        thisPost = $("<article class='o-media o-post'/>"),
        linkURL = this.post_url,
        postDate = '<a href="' + linkURL + '" class="o-media__date--tumblr o-iconed--small ss-tumblr ss-social" data-livestamp="' + this.timestamp + '"></a>';

      switch (postType) {

      /*** TEXT POST ***/
      case "text":
        var
          titleLength = 30,
          shortTitle = (this.title).length > titleLength ? (this.title).substring(0, titleLength) + "&hellip;" : this.title;

        thisPost.addClass('o-post--basic')
            .append(
              '<a href="' + linkURL + '" class="o-post__title"><span class="o-post__underline">' + shortTitle + '</span></a>', 
              postDate
              // '<div class="o-post__content">' + this.body + '</div>',
              // '<a class="o-button--text ss-navigateright right" href="' + linkURL + '">Read post on Tumblr</a>'
            );
        loopContainer.append(thisPost);
        break; /*** END TEXT POST***/

      /*** PHOTO POST ***/
      case "photo":
        // Pick only the first photo, delete for loop
        var
          postPhoto = this.photos[0],
          captionLength = 90,
          shortCaption = (this.caption).length > captionLength ? (this.caption).substring(0, captionLength) + "&hellip;" : this.caption;

        var
          overlay = $('<div class="o-media__overlay" />'),
          photoSizeURL;

        // Check for photo size options. Prevents really large original images from being called.
        if (postPhoto.alt_sizes[0].width >= 500) {
          var n = 0;
          for ( ; n < postPhoto.alt_sizes.length; n++) {
            if (postPhoto.alt_sizes[n].width === 500) {
              photoSizeURL = postPhoto.alt_sizes[n].url;
            }
          }
        } else {
          photoSizeURL = postPhoto.original_size.url;
        }
        // End for photo loop

        shortCaption = '<div class="o-post__content">' + shortCaption + '</div>';
        overlay.append(shortCaption, postDate);
        thisPost.addClass('o-post--photo')
            .append(
              '<img class="o-media__image" src="' + photoSizeURL + '"/>', 
              overlay
            );
        loopContainer.append(thisPost);
        break; /*** END PHOTO POST***/
      
      /*** QUOTE POST ***/
      case "quote":
        var
          quoteLength = 90,
          shortQuote = (this.text).length > quoteLength ? (this.text).substring(0, quoteLength) + "&hellip;" : this.text;
        thisPost.addClass('o-post--quote')
            .append(
              '<q class="o-post__quote">' + shortQuote + '</q>', 
              '<span class="o-post__source"> &#8212; ' + this.source + '<span>', 
              postDate
              // '<a href="' + linkURL + '">View quote on Tumblr</a>'
            );
        loopContainer.append(thisPost);
        break; /*** END QUOTE POST***/

      /*** VIDEO POST ***/
      case "video":
        thisPost.addClass('o-post--video')
            .append(
              '<div class="o-post__player">' + this.player[2].embed_code + '</div>',
              postDate
              // this.caption,
              // '<a href="' + linkURL + '">Watch video on Tumblr</a>'
            );
        loopContainer.append(thisPost);
        break; /*** END VIDEO POST ***/

      /*** LINK POST ***/
      case "link":
        var description;
          
        if (this.description) {
          description = this.description;
        } else {
          description = "";
        }

        thisPost.addClass('o-post--link')
            .append(
              postDate,
              '<a href="' + this.url + '">' + this.title + '</a>',
              description
              // '<a href="' + linkURL + '">Go to tumblr post...</a>'
            );
        loopContainer.append(thisPost);
        break; /*** END LINK POST ***/

      /*** CHAT POST ***/
      case "chat":
        thisPost.addClass('o-post--chat')
            .append(
              postDate
              );

        for (var i = 0; i < this.dialogue.length; i++){
          thisPost.append(
            '<span class="chat-post-name">' + this.dialogue[i].name + '</span>',
            '<p class="chat-post-phrase">' + this.dialogue[i].phrase + '</p>'
          );
        }

        thisPost.append('<a href="' + linkURL + '">Go to tumblr post...</a>');

        loopContainer.append(thisPost);
        break; /*** END CHAT POST ***/
      }
    });
    
    blog.append(loopContainer.html());
    blogPack();
  }; /*** END POSTS ***/

  s.getPosts = function (target, APIKey) {
    var postsPerPage = s.settings.postsPerPage;

    $.ajax({
        url: APIKey + "&limit=" + postsPerPage + "&offset=0",
        dataType: "jsonp",
        jsonp: "&jsonp",
        success: function (data) {
          formatPosts(target, data);
        },
        error: function () {
          target.append(s.settings.error);
        }
    });
  };

  s.init = function () {
    s.getPosts(target, APIKey);
  };

  s.destroy = function (clearContainer) {
    if(clearContainer === true) {
      target.html("");
    }

    $('.blog-btn').off('.embedTumblr');

    target.removeData('embedTumblr');
  };
}

})(jQuery);

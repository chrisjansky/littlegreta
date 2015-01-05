<?php
  // Let's run the API then JSON decode and store in variable
  $twitter = new TwitterAPIExchange($settings);
  $twitter_stream = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest());

  // Check if at least 1 tweet returned from API
  if (isset($twitter_stream[0]->text)) {

    ob_start(); // Start buffer
    
    // Place to start wrapping element
    $tweet_count = 0; // Initialize tweet start count
      
    foreach ($twitter_stream as $tweet) {
      
      $is_retweet = isset($tweet->retweeted_status);
      // $has_media = isset($tweet->entities->display_url);

      if ($is_retweet) {
        $tweet_text = htmlspecialchars($tweet->retweeted_status->text);
      } else {
        $tweet_text = htmlspecialchars($tweet->text);
      }
      $tweet_start_char = substr($tweet_text, 0, 1);

      // Default media type
      $tweet_type = "basic";
      // Empty media by default - may contain previous iteration
      $tweet_media = "";

      $possible_types = array("youtube", "vimeo", "instagram");

      foreach ($tweet->entities as $type => $things) {
        foreach ($things as $entity => $value) {

          switch ($type) {
            case "media":

              if (isset($value->media_url)) {
                $tweet_type = "image";
                $tweet_media = "<img class=\"o-tweet__image\" src=\"{$value->media_url}:medium\" alt=\"Twitter Photo\" >";
              // } else if (strpos($value->display_url, "instagram") !== false) {
              //   $zkouska = "instagram";
              // }
              // Loop over possible types to find the current one
              } else foreach ($possible_types as $media_type) {

                if (strpos($value->display_url, $media_type) !== false) {
                  if ($media_type === "instagram") {
                    $tweet_media = "<img src=\"{$value->expanded_url}media/?size=m\" alt=\"Instagram Photo\" >";
                  }
                  $tweet_type = $media_type;
                  break;
                }

              }
            break;
          } // End switch

        }
      }
      
      if ($tweet_start_char != "@" || $ignore_replies == false) {
      
        // Let's create links from hashtags, mentions, urls
        // Urls
        $tweet_text = preg_replace('/(https?:\/\/[^\s"<>]+)/','<a data-lol href="$1">$1</a>', $tweet_text);
        // Mentions
        $tweet_text = preg_replace('/(^|[\n\s])@([^\s"\t\n\r<:]*)/is', '$1<a data-lol2 href="http://twitter.com/$2">@$2</a>', $tweet_text);
        // Hashtags
        $tweet_text = preg_replace('/(^|[\n\s])#([^\s"\t\n\r<:]*)/is', '$1<a data-lol3 href="http://twitter.com/search?q=%23$2">#$2</a>', $tweet_text);
        
      ?>

        <article class="o-media o-tweet o-tweet--<?php echo $tweet_type; ?>">
          <?php if ($tweet_type === "image" || $tweet_type === "instagram") { ?>
            <?php echo $tweet_media ?>
            <div class="o-tweet__overlay">
          <?php } ?>

          <p class="o-tweet__text"><?php echo $tweet_text ?></p>
          <div class="o-tweet__info">
            <span class="ss-twitter"></span>
            <a class="o-tweet__date" href="http://twitter.com/<?php echo $tweet->user->screen_name ?>/statuses/<?php echo $tweet->id ?>" data-livestamp="<?php echo strtotime($tweet->created_at) ?>"></a>
            <?php if ($is_retweet) : ?><span class="o-tweet__note">Retweet</span><?php endif; ?>
          </div>

          <?php if ($tweet_type === "image" || $tweet_type === "instagram") { // Close overlay ?>
            </div>
          <?php } ?>
        </article>

        <?php
        // Count tweets and quit if necessary
        $tweet_count++; if ($tweet_count >= $number_tweets) break;
        
      } // End if start_char

    } // End $tweet loop
    
    // Place to end wrapping element
    
    // Write new cache file in the same directory
    $file = @fopen(dirname(__FILE__).'/'.$twitter_cache_file, 'w');

    // Save contents and flush buffer
    @fwrite($file, ob_get_contents()); 
    @fclose($file); 
    ob_end_flush();
    
    // Tweets present, all good
    $tweet_flag = 1;

  }
?>

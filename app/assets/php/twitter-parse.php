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

      if ($is_retweet) {
        $tweet_text = html_entity_decode($tweet->retweeted_status->text);
      } else {
        $tweet_text = html_entity_decode($tweet->text);
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
                $tweet_type = "photo";
                $tweet_media = "<img class=\"o-media__image\" src=\"{$value->media_url}:medium\" alt=\"Twitter Photo\" >";
              // Loop over possible types to find the correct one
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
        $tweet_text = preg_replace('/(https?:\/\/[a-z|A-Z|0-9|.|\/]+)/','<a href="$1">$1</a>', $tweet_text);
        // Mentions
        $tweet_text = preg_replace('/(^|[\n\s])@([a-z|A-Z|0-9|\_]*)/is', '$1<a href="http://twitter.com/$2">@$2</a>', $tweet_text);
        // Hashtags
        $tweet_text = preg_replace('/(^|[\n\s])#([^\s"\t\n\r<:]*)/is', '$1<a href="http://twitter.com/search?q=%23$2">#$2</a>', $tweet_text);
        
      ?>

        <article class="o-media o-tweet o-tweet--<?php echo $tweet_type; ?>">
          <?php if ($tweet_type === "photo" || $tweet_type === "instagram") { ?>
            <?php echo $tweet_media ?>
            <div class="o-media__overlay">
          <?php } ?>

          <p class="o-tweet__text"><?php echo $tweet_text ?></p>
          <div class="o-tweet__info">
            <a class="o-media__date--twitter o-iconed--small ss-twitter ss-social" href="http://twitter.com/<?php echo $tweet->user->screen_name ?>/statuses/<?php echo $tweet->id ?>">
              <?php if ($is_retweet) : ?><span class="t-smallcaps">Retweeted </span><?php endif; ?>
              <span data-livestamp="<?php echo strtotime($tweet->created_at) ?>"></span>
            </a>
          </div>

          <?php if ($tweet_type === "photo" || $tweet_type === "instagram") { // Close overlay ?>
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

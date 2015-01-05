<?php

/**
 * Twitter Feed Parser
 * 
 * @version   1.1.2
 * @author  Dario Zadro
 * @link  http://zadroweb.com/your-twitter-feed-is-broken/
 * 
 * Notes:
 * Caching is used - Twitter only allows 180 queries for every 15 minutes
 * See: https://dev.twitter.com/docs/rate-limiting/1.1
 * Super simple debug mode will output returned API variable
 * --
 * Twitter time is displayed (ex. "about 1 hour ago")
 * 
 * Credits:
 * Twitter API: https://github.com/J7mbo/twitter-api-php
 * Hashtag/Username Parsing: http://snipplr.com/view/16221/get-twitter-tweets/
 * Time Ago (modified) Function: http://css-tricks.com/snippets/php/time-ago-function/
 */

// Flag for twitter error
$tweet_flag = 0;

if (!$twitter_debug) {
  
  // Time the cache was last created
  $cache_created_on = ((@file_exists($twitter_cache_file))) ? @filemtime($twitter_cache_file) : 0;
  
  // Output the cache file if valid time
  if ( (time() - $twitter_cache_time < $cache_created_on) && $twitter_caching) {
    
    // Tweets should be in cache file, all good
    $tweet_flag = 1;
    
    // Get tweets from cache
    @readfile($twitter_cache_file); 
  
  } else {
    require "twitter-parse.php";
  }

} else {
  
  // Let's run the API then JSON decode and store in variable
  $twitter = new TwitterAPIExchange($settings);
  $twitter_stream = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest());

  // Debug mode, just output twitter stream variable
  echo '<pre>';
  print_r($twitter_stream);
  echo '</pre>';
  
}

// If API didn't work for some reason, output some text
if (!$tweet_flag) {
  echo $tweets = '<ul class="twitter_stream twitter_error"><li>Oops, something went wrong with our twitter feed - <a href="http://twitter.com/'.$twitter_username.'/">Follow us on Twitter!</a></li></ul>';
}

?>

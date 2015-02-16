<?php
  // Your Twitter App Settings
  // https://dev.twitter.com/apps
  $access_token        = "";
  $access_token_secret = "";
  $consumer_key        = "";
  $consumer_secret     = "";

  // Some variables
  $twitter_username    = "littlegretacz";
  $number_tweets       = 6; // How many tweets to display? max 20
  $ignore_replies      = true; // Should we ignore replies?
  $twitter_caching     = true; // You can change to false for some reason
  $twitter_cache_time  = 60 * 60; // 1 Hour
  $twitter_cache_file  = "tweets.txt"; // Check your permissions
  $twitter_debug       = false; // Set to "true" to see all returned values

  // Settings for TwitterAPIExchange.php
  $url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
  $getfield = "?screen_name=" . $twitter_username;
  $requestMethod = "GET";
  $settings = array(
    "oauth_access_token" => $access_token,
    "oauth_access_token_secret" => $access_token_secret,
    "consumer_key" => $consumer_key,
    "consumer_secret" => $consumer_secret
  );
?>

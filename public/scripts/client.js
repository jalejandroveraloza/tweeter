/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }

    
  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      console.log(tweet)
      const newtweets = createTweetElement(tweet);
      $('.tweet-container').append(newtweets);
    }

  }

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="article-tweet-posted">
<header class="article-tweet-header">
  <div class="article-tweet-div-userphoto">
    <img src="${tweet.user.avatars}" alt="my-avatar">
    <h4>${tweet.user.name}</h4>
  </div>
  
  <h4>${tweet.user.handle}</h4>
</header>
  <div class="article-tweet-div">
    <h3>${tweet.content.text}</h3>
    <!-- <h3>@texto</h3> -->
  </div>
  

</header>

  <!-- <hr class="line-break"> -->

<footer class="article-tweet-footer">
  <span class="article-date-footer">${tweet.created_at}</span>
  <div class="article-tweet-footer-div">

    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>

  </div>

</footer>

</article>`


    return $tweet;
  }

  const postTweet = () => {
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $(".new-tweet-form").serialize(),
      dataType: 'json',
      success: (data) => {
        console.log("this request succeded", data)
      },
      error: (error) => {
        console.log("an error ocurred, ", error)
      }
    })

  }


  $('.new-tweet-form').submit(function (event) {
    event.preventDefault();
    postTweet();
  })

  

  renderTweets(data);
});
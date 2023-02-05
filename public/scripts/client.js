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
    $('.tweet-container').empty();
    for (let tweet of tweets) {
      //console.log(tweet)
      const newtweets = createTweetElement(tweet);
      $('.tweet-container').prepend(newtweets);
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
    <h3>${escape(tweet.content.text)}</h3>
    <!-- <h3>@texto</h3> -->
  </div>
  

</header>

  <!-- <hr class="line-break"> -->

<footer class="article-tweet-footer">
  <span class="article-date-footer">${timeago.format(tweet.created_at)}</span>
  <div class="article-tweet-footer-div">

    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>

  </div>

</footer>

</article>`


    return $tweet;
  }

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
    }).then(renderTweets)
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $('.error-empty-text').hide();
  $('.error-long-text').hide();


  $('.new-tweet-form').submit(function (event) {

    event.preventDefault();
    const maxChars = 140;

    const messageLength = $(this).find('.text-area').val().length;

    $('.error-empty-text').slideUp(400);
    $('.error-long-text').slideUp(400);

    if (messageLength === 0) {
      //window.alert("Please type a message")
      $('.error-empty-text').slideDown(400);
    }
    else if (messageLength > maxChars) {
      //window.alert("Please type a shorter message")
      $('.error-long-text').slideDown(400);
    }
    else {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(".new-tweet-form").serialize(),
      }).then(loadTweets)
    }
  })

  loadTweets();


});
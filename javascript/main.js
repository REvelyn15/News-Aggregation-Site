/*

*/

$(document).ready(function() {

  var topicArray = [];

  var addTitleAndUrlToArticleList = function(article) {
    var htmlTemplate = '<li>\
                          <a target="_blank" href="{url}">{title}</a> <br><br>\
                          {summary} \
                        </li>';

    var html = htmlTemplate.fill(article);
    $("#headlines").append(html);
  };

  var addToTopicList = function(topic, index) {
    var htmlTemplate = '<option value="' + index +'" id="topic'+ index +'">{english_subcategory_name}</option>';

    var html = htmlTemplate.fill(topic);
    $("#topicList").append(html);
  };

  var handleFeedzillaArticles = function(response) {
    $("#headlines").empty();


    var articleArray = response.articles; 
    for(var i=0; i<articleArray.length; i++) {
      var article = articleArray[i];
      //article.Url = "http://imdb.com/title/" + movie.imdbID;

      addTitleAndUrlToArticleList(article);
    }
    
  };

  var searchForThingInSearchBox = function() {
    var searchTerms = $("#searchBox").val();

    var ajaxParameters = {
      "url":"http://api.feedzilla.com/v1/articles/search",
      "data": {"q": searchTerms, "count":15},
      "crossDomain": true,
      "dataType": 'json',
      "success": handleFeedzillaArticles
    };

    $.ajax(ajaxParameters);
  };

  var captureTrendingTopics = function(response){

    for (var i = 0; i < 3; i++) {
      topicArray[i] = response[i];
    }

    for (var i = 0; i < topicArray.length; i++) {
      addToTopicList(topicArray[i], i);
    }

    searchTrendingTopicArticles(0);
  };

  var searchForTrendingTopics = function(){

    var ajaxParameters = {
      "url":"http://api.feedzilla.com/v1/subcategories",
      "data": {"order": "popular", "count":15},
      "crossDomain": true,
      "dataType": 'json',
      "success": captureTrendingTopics
    };

    $.ajax(ajaxParameters);
  };

  var getDropdown = function(){
    
  }

  var searchTrendingTopicArticles = function(index){

    var url ="http://api.feedzilla.com/v1/categories/{category_id}/subcategories/{subcategory_id}/articles".fill(topicArray[index]);

    var ajaxParameters = {
      "url":url,
      "data": {"count":15},
      "crossDomain": true,
      "dataType": 'json',
      "success": handleFeedzillaArticles
    };

    $.ajax(ajaxParameters);
  };

  searchForTrendingTopics();
  $("#searchButton").click(searchForThingInSearchBox);
  $("#topicButton").click(searchTrendingTopicArticles($("topicList").val()));

  
  // [YOUR CODE HERE]<option value="0" id="topic0">Trending 1</option>

  
});
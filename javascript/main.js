/*

*/

$(document).ready(function() {
  var addTitleAndUrlToArticleList = function(article) {
    var htmlTemplate = '<li>\
                          <a target="_blank" href="{url}">{title}</a> <br>\
                          {summary} \
                        </li>';

    var html = htmlTemplate.fill(article);
    $("#headlines").append(html);
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

  $("#searchButton").click(searchForThingInSearchBox);

  
  // [YOUR CODE HERE]

  
});
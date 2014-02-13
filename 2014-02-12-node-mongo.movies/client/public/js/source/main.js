(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(submitMovie);
    $('#movies').on('click', '.delete', deleteMovie);

    getMovies();
  }

 // function findMovie(){
    
 // }

  function deleteMovie(){
    var data = $(this).parent().data('movie-id');
    console.log(data);
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+data;
    console.log(url);
    var type = 'DELETE';
    var success = getMovies;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function submitMovie(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function newMovie(movie){
    displayMovie(movie);
  }

  function getMovies(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    $.getJSON(url, displayMovies);
  }

  function displayMovies(data){
    for(var i = 0; i < data.movies.length; i++){
      displayMovie(data.movies[i]);
    }
    
  }
  function displayMovie(movie){
    var $container = $('<tr>');
    var $name = $('<td>');
    var $rating = $('<td>');
    var $runtime = $('<td>');
    var $release = $('<td>');
    var $studio = $('<td>');
    var $actors = $('<td>');
    var $director = $('<td>');
    var $poster = $('<td><img src="' + movie.poster + '"></td>');
    var $button = $('<input type="button" class="delete button small radius" value="Delete"></button>');
    $poster.addClass('poster');

    $name.text(movie.name);
    $rating.text(movie.rating);
    $runtime.text(movie.runtime);
    $release.text(movie.release);
    $studio.text(movie.studio);
    $actors.text(movie.actors);
    $director.text(movie.director);
    $container.data('movie-id', movie._id);
    

    
    $container.append($poster, $name, $rating, $runtime, $release, $studio, $actors, $director, $button);
    $('tbody').append($container);

  
  }


})();


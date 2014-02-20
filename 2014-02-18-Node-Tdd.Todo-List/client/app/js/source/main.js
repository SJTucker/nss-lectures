(function(){

  'use strict';

  $(document).ready(initialize);

  var priorities = [];

  function initialize(){
    $(document).foundation();
    $('#priority').submit(submitPriority);
    getPriorities();
  }

  // ----------------------------------------------------------- //
// hide things in the future
  // ----------------------------------------------------------- //

  // ----------------------------------------------------------- //
// Priorities
  // ----------------------------------------------------------- //

  function submitPriority(event){
    var data = $(this).serialize();
    var url = generateUrl('/priorities');
    var type = 'POST';
    var success = addPriorityToTable;

    $.ajax({data:data, url:url, type:type, success:success});

    event.preventDefault();
  };

  function getPriorities(){
    var url = generateUrl('/priorities');
    var type = 'GET';
    var success = displayAllPriorities;
    $.ajax({url:url, type:type, success:success});
  }

  function displayAllPriorities(data){
    for(var i = 0; i < data.priorities.length; i++){
      addPriorityToTable(data.priorities[i]);
    }
  }

  function addPriorityToTable(priority){
    priorities.push(priority);

    var $row = $('<tr>');
    var $name = $('<td>');
    var $value = $('<td>');
    var $edit = $('<td>');
    var $del = $('<td>');

    $row.attr('data-priority-id', priority._id);
    $name.text(priority.name);
    $value.text(priority.value);

    $row.append($name, $value, $edit, $del);
    $('#priorities > tbody').append($row);
  }

  // ----------------------------------------------------------- //
// univiersal
  // ----------------------------------------------------------- //


  function generateUrl(path){
    var url = window.location.origin.replace(/\d{4}/, 4000);
    url += path;
    return url;
  }

})();


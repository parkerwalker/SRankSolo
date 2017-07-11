app.service('NotesService', function($http){

  ns = this;
  ns.recentMatchData = {}

  ns.laneMatchup = {};

  ns.postNotes = function(data){
    objectToSend = {
      notes: data.notes,
      players: [],
      lane: data.lane,
      createdBy: data.createdBy
    }//end objectToSend

    for (var i = 0; i < data.lostLane.length; i++) {
      objectToSend.players.push(data.lostLane[i]);
    }
    for (var i = 0; i < data.wonLane.length; i++) {
      objectToSend.players.push(data.wonLane[i]);
    }
    console.log(objectToSend);
    return $http({
      method: 'POST',
      url: '/notes',
      data: objectToSend
    }).then(function(response){
      console.log(response);
    });
  };//end post notes

  ns.searchParams = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url:'/notes/search',
      data: data
    }).then(function(response){
      console.log(response);
      return response
    })//end then
  };//end searchParams

});//end service

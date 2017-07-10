app.service('NotesService', function($http){

  ns = this;
  ns.recentMatchData = {}

  ns.laneMatchup = {};

  ns.postNotes = function(data){
    objectToSend = {
      notes: data.notes,
      players: [],
      lane: data.lane
    }//end objectToSend

    for (var i = 0; i < data.lostLane.length; i++) {
      objectToSend.players.push(data.lostLane[i]);
    }
    for (var i = 0; i < data.wonLane.length; i++) {
      objectToSend.players.push(data.wonLane[i]);
    }
    console.log(objectToSend);
    // return $http({
    //   method: 'POST',
    //   url: '/notes',
    //   data:
    // })
  };//end post notes

});//end service

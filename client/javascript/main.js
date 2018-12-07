var main = function(){
    "use strict";
    var player_id = "p "+guidGenerator(); 

    // Add listener to the matchmaking button (temporary button)
    $("#requestMatchmaking").on("click", function(){
        var socket = new WebSocket("ws://localhost:3000"); 
        socket.onopen(function (){
            socket.send({"id":player_id});
        });

        socket.onmessage( function(message) { // What to do when we receive a message from the server
            // Server message: {p0: pid0, p1: pid1, shot: {x: , y: } ...maybe more}
            var player_id0 = message["p0"];
            var player_id1 = message["p1"];
            if(!(player_id0==player_id || player_id1==player_id)){ // If the server message is aimed at someone else, tell the server.
                socket.send("Message arrived at wrong player!");
            }else{
                
            }
        });
    } );

    // Generate the table that is the grid
    var grid = initGrid(); // grid(x,y) returns a jQuery object of cell (x,y) from the table.
    
    // todo Place the ships in a space where you can drag them around.
    
    // todo Add a listener to the randomize button --> pressing it should randomize the ships' locations


    // todo Somehow make the ships draggable/placeable
    

};
function guidGenerator() {
    // From: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    // Generates a random string used for player identification.
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

$(document).ready(main);
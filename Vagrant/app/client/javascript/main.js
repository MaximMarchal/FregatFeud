var main = function(){
    "use strict";
    var playerID = "p "+guidGenerator(); 

    // Add listener to the matchmaking button 
    $("#requestMatchmaking").on("click", function(){
        // Tells the server "im ready to play"
        // Sends the player's ID as payload
        $.post("requestMatchmaking", {"pid":playerID}, function(response){
            console.table(response);
        } )

        // Adds a button to the console button span to indicate we are queued
        var $queuedButton = $("<button>").attr("id","queued_button");
        $queuedButton.on("click", function(){ // When the button is pressed, ask the server our game ID
            $.post("/request_game_id", {"pid":playerID}, function(response){
                console.table(response);
            });
        });
        $queuedButton.text("ask game id");
        $("#console_buttons").append($queuedButton);
        
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
var main = function(){
    "use strict";
    // Code hier
    var playerID = guidGenerator();
    // Add listener to the matchmaking button 
    $("#requestMatchmaking").on("click", function(){
        // Tells the server "im ready to play"
        // Sends the player's ID as payload
        $.post("requestMatchmaking", {"pid":playerID}, function(response){
            console.log("response: "+response);
        } )
    } )

    // Generate the table that is the grid
    var grid = initGrid(); // grid(x,y) returns a jQuery object of cell (x,y).
    
    // Place the ships in a space where you can drag them around.
    
    // Add a listener to the randomize button --> pressing it should randomize the ships' locations


    // Somehow make the ships draggable
    

};
function guidGenerator() {
    // From: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

$(document).ready(main);
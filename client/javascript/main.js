var main = function(){
    "use strict";
    var player_id = "p "+guidGenerator(); 
    var ships = []; 
    var socket;

    // Generate the table that is the grid
    var grid = initGrid(); // grid(x,y) returns a jQuery object of cell (x,y) from the table.
    
    // todo Place the ships in a space where you can drag them around.
    
    // todo Add a listener to the randomize button --> pressing it should randomize the ships' locations


    // todo Somehow make the ships draggable/placeable
    
    // Opens connection by clicking on the matchmaking button
    $("#request_matchmaking").on("click", function(){
        $("#request_matchmaking").empty();
        socket = new WebSocket("ws://localhost:3000"); 
        socket.onopen = function (){
            socket.send(JSON.stringify({"id":player_id}));
            console.log("Socket is now open");
        };

        socket.onmessage = function(socket_message){
            console.log(socket_message); 
            try{
                var message = JSON.parse(socket_message["data"]);
            }catch(e){
                console.log("Message from socket was not in JSON format");
                return;
            }
            var response = {"pid": player_id}; // always signs the message with player_id
            response["message_type"]= msg_types.OK;
            switch(message["message_type"]){
                case msg_types.REQUEST_SHIP_LOCATION:
                    console.log("REQUEST_SHIP_LOCATION received");
                    response["message_type"] = msg_types.SHIPS_LOCATION;
                    response["ships"] = ships;
                    socket.send(JSON.stringify(response));
                    break;
                case msg_types.REQUEST_ID:
                    console.log("REQUEST_ID received");
                    socket.send(JSON.stringify(response));
                    break;
                case msg_types.SHOT_FROM_OPPONENT:
                console.log("SHOT_FROM_OPPONENT received");
                    // TODO: check if location has ship
                        // If true: draw explosion else draw water
                    grid(message["x"],message["y"]).css("background-color","red"); // temporary red background from opponent shots
                    break;
                case msg_types.PLAYER_WON:
                    console.log("PLAYER_WON received");
                    // TODO: something fancy
                    console.table({"YOU":"HAVE", "WON":"CONGRATULATIONS"});
                    return;
                case msg_types.OK:
                    // Do nothing
                    console.log("OK received");
                    return;
                case msg_types.ENQUEUED:
                    // TODO: write enqueued somewhere in the DOM
                    console.log("ENQUEUED received");
                    return;
                default:
                    socket.send("Sorry, I didnt get that!");
                    socket.close();
                    return;
            }
        };
        
    } );

    $("#send_shot").on("click", function(){ // Simulate a shot sent by pressing a button
        socket.send({ // Send a shot on grid(5,6)
            "message_type": msg_types.SEND_SHOT,
            "shot": {
                "x": 5,
                "y": 6
            }
        }); 
    })
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
var express = require("express"),
    http = require("http"),
    app = express(),
    Game = require("./server_files/game.js"),
    websocket = require("ws"),
    msg_types = require('./client/javascript/enums.js');

app.use(express.static(__dirname+"/client"));
var server = http.createServer(app);
app.use(express.urlencoded());

// Websocket definition
var queue = [];
var player2socket = new Map();
var games = new Map();

const wss = new websocket.Server({server});
wss.on("connection", function connection(ws){
    ws.on("message", function incoming(message){
        console.log(message);
        try{
            console.log(JSON.parse(message));
        }catch(e){
            console.log("message wasnt in json format");
        }
        //console.log("\n");
        var proponent = message["pid"];
        var response = {};
        switch(message["message_type"]){
            case msg_types.ID_PAYLOAD:
                console.log("ID_PAYLOAD received");
                if(queue.length===0){
                    response["message_type"] = msg_types.ENQUEUED;
                    player2socket.set(proponent,ws);
                    queue.push(proponent);
                    ws.send(JSON.stringify(response));
                    console.log("I sent: "+JSON.stringify(response))
                }else{
                    var opponent = queue.pop();
                    var new_game = new Game(opponent,proponent);
                    var opponent_socket = player2socket.get(opponent);
                    // Request ship locations from both players
                    response = {"message_type":msg_types.REQUEST_SHIP_LOCATION};
                    ws.send(JSON.stringify(response)); 
                    console.log("I sent: "+JSON.stringify(response));
                    opponent_socket.send(JSON.stringify(response));
                }
                break;
            case msg_types.SEND_SHOT:
                console.log("SEND_SHOT received");
                // Update the game that proponent is in
                var current_game = games.get(proponent);
                current_game.add_shot(proponent, message["shot"]["x"], message["shot"]["y"]);
                // Send a shot to the other participant
                

                // TODO: check if its a legal shot
                response["message_type"] = msg_types.OK;
                console.log("I sent: "+JSON.stringify(response))
                ws.send(JSON.stringify(response));
                break;
            case msg_types.SHIPS_LOCATION:
                console.log("SHIPS_LOCATION received");
                // Add the location of these ships to the game
                var current_game = games.get(proponent);
                var ships_location = message["ships"];
                for(var ship_loc in ships_location){
                    var x0_tmp = ship_loc["x0"];
                    var y0_tmp = ship_loc["y0"];
                    var x1_tmp = ship_loc["x1"];
                    var y1_tmp = ship_loc["y1"];
                    current_game.add_ship(proponent,x0_tmp, y0_tmp, x1_tmp, y1_tmp);
                };
                response["message_type"] = msg_types.OK;
                console.log("I sent: "+JSON.stringify(response));
                ws.send(JSON.stringify(response));
                break;
            case msg_types.OK:
                console.log("OK received");
                break;
            default: 
                ws.send("unknown message type received. bye");
                //ws.close();
                break;
        }
        
    });
    
    ws.send(JSON.stringify({"message_type": msg_types.REQUEST_ID}));
});


server.listen(3000);
console.log("server online at :3000");
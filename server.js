var express = require("express"),
    http = require("http"),
    app = express(),
    Game = require("./serverJS/game.js");

app.use(express.static(__dirname+"/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded());
console.log("server online at :3000");


// Keep a queue of players waiting to be matched
// If a player requests matchmaking, add them to the queue
var queue = [];
var ws2gameid = new Map();
app.post("/matchmaking", function(req, res){
   // The client POSTs a websocket through /matchmaking
    toReturn = {};
   if(queue.length == 0){ // If there is nobody to play with, put the player on hold
        queue.push(req.body["pid"]); // Push the player ID onto the Queue.
        websockets.set(req.body["ws"], null); // Push the websocket into a map, pointing to a null game
   }else{
       opponent_id = queue.pop();
   }
    
});

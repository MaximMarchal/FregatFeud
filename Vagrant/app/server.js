var express = require("express"),
    http = require("http"),
    app = express();

app.use(express.static(__dirname+"/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded());
console.log("server online at :3000");

var gameHistory = [];

var playerQueue = [];  // Playerqueue is an array of player IDs that are not playing right now
app.post("/requestMatchmaking", function(req,res){
    console.log("Player requested matchmaking!");
    console.log("Player id: "+JSON.stringify(req.body));
    var response = {
        "title": "You have been queued up",
        };
    if(playerQueue.length > 0){
        var opponentID = playerQueue.pop();
        response["opponent_id"] = "p"+guidGenerator();
        response["game_id"] = "g"+guidGenerator();
    }
    
    
    res.send(response);
});

app.get("/submitTurn", function(req, res){
    gameHistory.push(req); 

    // Send an "OK" if the move is valid    
    // Send "NOK" if move is invalid
    console.log("received submitTurn");
    res.send("submitTurn request received");
});

function guidGenerator() {
    // From: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
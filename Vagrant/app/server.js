var express = require("express"),
    http = require("http"),
    app = express();

app.use(express.static(__dirname+"/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded());
console.log("server online at :3000");

var gameHistory = [];

app.get("/submitTurn", function(req, res){
    gameHistory.push(req); 

    // Send an "OK" if the move is valid    
    // Send "NOK" if move is invalid
    console.log("received submitTurn");
    res.send("submitTurn request received");
});

app.post("/requestMatchmaking", function(req,res){
    console.log("Player requested matchmaking!");
    console.log("Player id: "+req.body);
    res.send("Message received");
});
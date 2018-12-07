var express = require("express"),
    http = require("http"),
    app = express(),
    Game = require("./game.js");

app.use(express.static(__dirname+"/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded());
console.log("server online at :3000");

var games = {"games": ""};
var queue = {"players": []};




app.post("/requestMatchmaking", function(req,res){
    console.log("Player requested matchmaking!");
    console.log("Player id: "+JSON.stringify(req.body));
    var response = {
        "message": "",
        };

    if(playerQueue.length > 0){
        var opponent = playerQueue.pop();
        response["opponent_id"] = opponent["pid"];
        var new_game = new Game(opponent["pid"], req.body["pid"]);
        
        active_games.push(new_game);
        player_game_map[new_game.get_players["0"]] = new_game.get_id();
        player_game_map[new_game.get_players["1"]] = new_game.get_id();
        console.log(JSON.stringify(active_games));
        response["Game information"] = new_game;
    }else{
        response["message"] = "You have been queued up!";
        playerQueue.push(req.body);
        console.log(req.body["pid"]+" queued.");
    }
    
    
    res.send(response);
});

app.post("/request_game_id", function(req, res){
    var client_pid = req.body["pid"];
    var response = {"message":"Your game id is: "};
    res.send();
});



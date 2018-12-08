function Game(pid0, pid1){
    this.player0 = pid0;
    this.player1 = pid1;
    this.game_id = "g"+guidGenerator();

    this.ships = {
        "player0": [],
        "player1": []
    };

    this.shots_fired = {
        "player0": [],
        "player1": []
    };
}

Game.prototype.add_ship = function(pid, x0, y0, x1, y1){
    if(x0===x1){ // Vertical ship
        var lowY = y0<y1?y0:y1;
        var highY = y1>y0?y1:y0;
        for(var i = lowY; i<= highY; i++){
            this.ships[pid].add({
                "x":  x0  ,
                "y":   i
            });
        };
    }else{  // Horizontal ship
        var lowX = x0<x1?x0:x1;
        var highX = x0>x1?x0:x1;
        for(var i = lowX; i<=highX; i++){
            this.ships[pid].add({
                "x": i,
                "y": y0
            });
        };
    }
}

Game.prototype.get_opponent = function(proponent_id){
    if(this.player0===proponent_id){
        return this.player1;
    }else{
        return this.player0;
    }
}

function guidGenerator() {
    // From: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    // Generates a random string used for player ids
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4());
}

module.exports = Game;
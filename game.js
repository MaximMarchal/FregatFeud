var Game = function (pid0, pid1){
    this.pid0 = pid0;
    this.pid1 = pid1;
    this.game_id = "g "+guidGenerator();

}
Game.prototype.get_id = function(){
    return this.ID;
}
Game.prototype.get_players = function(){
    return {
        "0": this.pid0,
        "1": this.pid1
    };
}

function guidGenerator() {
    // From: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4());
}

module.exports = Game;
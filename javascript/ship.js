// 

function Ship(x0, x1, y0, y1){
    this.x0 = x0; this.x1 = x1; this.y0 = y0; this.y1 = y1;

    
    
}
Ship.prototype.shipSize = function(){
    return this.x0===this.x1?Math.abs(this.y0-this.y1):Math.abs(this.x0-this.x1);
}
Ship.prototype.fitsWith = function(otherShip){
    // TODO
    // Return true if the otherShip does not conflict with this ship.
}

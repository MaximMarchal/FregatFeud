var main = function(){
    "use strict";
    // Code hier
    
    generateGrid();
    
    


}

var generateGrid = function(){  
    // Generate a 10 by 10 grid in the <span> <table> element
    var w = 10, h = 10;
    var $tableRef = $(".gridTable table");
    var $tdToAdd;
    var $trToAdd;
    for(let i = 0; i<h; i++){
        $trToAdd = $("<tr>");
        for(let j = 0; j<w; j++){
            // Add <td>'s with the proper ID to the <tr> elements.
            $tdToAdd = $("<td>").attr("id",i+"COMMA"+j); // jQuery doesn't work when there's a comma in the id attribute.
            $tdToAdd.append($("<div>")); // embed a <div> in the <td> 
            $trToAdd.append($tdToAdd);
        }
        $tableRef.append($trToAdd);
    }
}
var shoot = function(i, j){
    // Select the div at position (i,j)
    var computedId = "#"+i+"COMMA"+j;
    $targetCell = $(computedId);
    $targetCell.attr("style","background: red");
    return false;
}
$(document).ready(main);
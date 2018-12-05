var express = require("express"),
    http = require("http"),
    app = express();

app.use(express.static(__dirname_+"/client"));
http.createServer(app).listen(3000);
app.use(express.urlencoded());
console.log("server online @ :3000");
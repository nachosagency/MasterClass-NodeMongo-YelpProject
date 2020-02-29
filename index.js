console.log("Launching app...");

var express = require("express");
var fs = require("fs");

var app = express();
app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "html");
var templateVersion = 'v1';

app.get("/", function(req, res){
    res.render(templateVersion+'_index', {
        searchTag: '',
        searchAddress: '',
        bizFromApi: []
    });
});

app.get("/search", function(req, res){

    res.render(templateVersion+'_index', {
        searchTag: '',
        searchAddress: '',
        bizFromApi: []
    });
});

app.listen(8080);
console.log("Listening on http://127.0.0.1:8080/\n");
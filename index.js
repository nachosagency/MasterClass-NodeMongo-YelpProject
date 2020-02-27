var express = require("express");
var fs = require("fs");

var app = express();
app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "views/");
app.set("view engine", "html");

console.log("Launching app...");

app.get("/", function(req, res){
    res.render('index', {
        searchTag: '',
        searchAddress: '',
        bizFromApi: []
    });
});

app.get("/search", function(req, res){

    res.render('index', {
        searchTag: '',
        searchAddress: '',
        bizFromApi: []
    });
});

app.listen(8080);
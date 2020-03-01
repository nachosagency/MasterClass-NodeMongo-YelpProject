console.log("Launching app...");

var express = require("express");
var fs = require("fs");
var request = require('request');

var app = express(); 
app.engine(".html", require("ejs").__express); // Configuration Express
app.set("views", __dirname + "/views"); // Configuration Express
app.set("view engine", "html"); // Configuration Express
app.use(express.static('public')); // Ajout d'un dossier statique pour les images et CSS 
app.use(express.urlencoded({ extended: true })) // Analyser les requêtes d'URLs encodés (tels que envoyés par les formulaires HTML)
app.use(express.json()); // Analyser les requêtes JSON (envoyés par les clients d'API)

var templateVersion = 'v1';

app.get("/", function(req, res){
    res.render(templateVersion+'_index', {
        searchTag: '',
        searchAddress: '',
        bizFromApi: []
    });
});

app.post("/search", function(req, res){
    var _url = 'https://api.yelp.com/v3/businesses/search?term='+(( req.body.search_term ) ? req.body.search_term : '')+'&location='+(( req.body.address ) ? req.body.address : '')+'';
    request(_url, 
                { json: true, 'auth': { 'bearer': 'uPFVvL6aObdtBJUs1uWBTaRgaDaOpOhuWQVcFj3zIo30oqMXPqOCv5XyIYsZkXkd2gWBuVRp8GVl0nVUAQ17RfoFEZkBHBuhT3BhJgMfOwxZM4owN8sUF_93rYJBXXYx' } }, 
                (err, res2, body) => {
        var _bizFromApi = [];
        if (err) { 
            console.log(err); 
            _bizFromApi = null;
        }else{
            _bizFromApi = ( body.businesses ) ? body.businesses : null;
        }
        
        res.render(templateVersion+'_index', {
            searchTag: ( req.body.search_term ) ? req.body.search_term : '',
            searchAddress: ( req.body.address ) ? req.body.address : '',
            bizFromApi: _bizFromApi
        });
    });
});

app.listen(8080);
console.log("Listening on http://127.0.0.1:8080/\n");
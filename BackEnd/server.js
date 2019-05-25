var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var x = [{
        key:0,
        latlng:{
            latitude: 8.593446,
            longitude: 81.210673
        },
        title : "Salun kada sammuham ivar than",
        active: 0},{
        key:1,
        latlng:{
            latitude: 8.583646,
            longitude: 81.210673
        },
        title : "Salun kada saheem bhai",
        active: 0},{
        key:2,
        latlng:{
            latitude: 8.603546,
            longitude: 81.210673
        },
        title : "Salun kada sahan",
        active: 1},

    ];
    res.send(x);
})



var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
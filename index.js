var express = require("express");
var app = express();
var port = 3700;
 
var ranking = 1;
var names = [];

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  socket.on('send', function (data) {
    var text = data.message + ": " + ranking;
    names.push(text);
    io.sockets.emit('message', { message: [names, ranking ] });
    ranking++;
  });
});

console.log("Listening on port " + port);


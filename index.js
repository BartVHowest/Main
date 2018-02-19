var server_port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';

var app = require('express')();

app.set('port', server_port);
app.set('ip', server_ip_address);

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('NodeJS is running!');
});

http.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port );
});

io.on('connection', function (socket) {
  console.log('a new user connected');
  
  socket.on('disconnect', function () {
    console.log("user left");
  });
});

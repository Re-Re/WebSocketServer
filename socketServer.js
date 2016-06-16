var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);
    
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.get('/',function(req , res) {
    res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('send message', function (msg) {
        io.sockets.emit('message',msg);
    });
});

io.sockets.on('disconnect',function(socket){
    io.sockets.emit('message',"disconnected.");
});

server.listen(server_port,server_ip_address);

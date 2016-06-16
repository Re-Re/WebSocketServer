var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);


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

server.listen(80);

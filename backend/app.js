/**
 *  @file Project Kotori Backend
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-02
 */
"use strict";

const app = require('koa')();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const serve =require('koa-static');

app.use(serve('../frontend'));

const playerMap = new Map();

const createPlayer = ()=>{return {
    x : 0,
    y : 0,
    z : 0,
    ry : 0
};};

io.on('connection', function(socket){
    console.log("a new client connected");
    let name = null, playerRef = null;
    socket.on('Game::Enter@Req', function(msg){
        if(playerMap.has(msg)){
            socket.emit('Game::Enter@Res','failed');
        }else{
            name = msg;
            socket.emit('Game::Enter@Res','ok');
            socket.emit('Chat::SystemMsg@Res',"Welcome to join our game!");
            console.log(`new player:${name}`);
            playerMap.set(msg,createPlayer());
            playerRef = playerMap.get(msg);
            socket.broadcast.emit('Game::Init@Res',JSON.stringify({
                name : name,
                x : -5.168,
                y : 1.392,
                z : -7.463,
                ry : 3.9
            }));
        }
    });
    socket.on('Game::Init@Req', function(msg){
        for(let player of playerMap){
            console.log(name);
            console.log(player);
            if(player[0] != name){
                socket.emit('Game::Init@Res',JSON.stringify({
                    name : player[0],
                    x : player[1].x,
                    y : player[1].y,
                    z : player[1].z,
                    ry : player[1].ry
                }));
            }
        }
    });
    socket.on('Game::SelfMove@Req', function(msg){
        console.log(`name : ${name} move ${msg}`);
        const obj = JSON.parse(msg);
        playerRef.x = obj.x;
        playerRef.y = obj.y;
        playerRef.z = obj.z;
        playerRef.ry = obj.ry;
        socket.broadcast.emit('Game::SelfMove@BC',JSON.stringify({
            name : name,
            x : playerRef.x,
            y : playerRef.y,
            z : playerRef.z,
            ry : playerRef.ry
        }));
    });
    socket.on('Chat::SendMsg@Req', function(msg){
        console.log(`message from ${name} : ${msg}`);
        socket.emit('Chat::SendMsg@Res','ok');
        socket.broadcast.emit('Chat::SendMsg@BC',JSON.stringify({name : name, msg : msg}));
    });
    socket.on('disconnect', function(){
        if(name != null){
            playerMap.delete(name);
            socket.broadcast.emit('Game::Disconnect@BC',name);
        }
        console.log('user disconnected');
    });
});
server.listen(3000);
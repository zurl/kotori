/**
 *  @file Project Kotori Backend
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-02
 */
"use strict";

const app = require('koa')();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});
server.listen(3000);
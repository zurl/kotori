/**
 *  @file Project Kotori Network Module
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-03
 */
"use strict";

const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3000/");

exports.linkServer = new Promise((solved,rejected)=>{
    const button = document.getElementById("link");
    const input = document.getElementById("name");
    button.onclick = ()=>{
        socket.emit('chat message', input.innerHTML);
    };
});


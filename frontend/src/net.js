/**
 *  @file Project Kotori Network Module
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-03
 */
"use strict";

const BABYLON = require("babylonjs");
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3000/");
const $ = require('jquery');
const Status = require('./status');

exports.linkServer = (createPlayerCallback)=>new Promise((resolved,rejected)=>{
    const form = $('#login-form');
    form.submit(()=>{
        socket.emit('Game::Enter@Req', $('#name-input').val());
        socket.on('Game::Enter@Res', function(msg){
            if(msg == "ok"){
                Status.playerMap.set($('#name-input').val(),Status.currentPlayer);
                Status.currentPlayer.name = $('#name-input').val();
                console.log("ok");
                $("#login-container").hide();
                socket.emit('Game::Init@Req','');
                $('#screen-container').show();
                resolved();
                socket.on('Game::Init@Res', async function(msg) {
                    console.log("init");
                    const obj = JSON.parse(msg);
                    const meshPlayer = await createPlayerCallback(obj.name);
                    meshPlayer.position = new BABYLON.Vector3(
                        parseFloat(obj.x),
                        parseFloat(obj.y),
                        parseFloat(obj.z));
                    meshPlayer.rotation = new BABYLON.Vector3(
                        parseFloat(meshPlayer.rotation.x),
                        parseFloat(obj.ry),
                        parseFloat(meshPlayer.rotation.z));
                });
                socket.on('Game::SelfMove@BC',function(msg){
                    const obj = JSON.parse(msg);
                    const playerRef = Status.playerMap.get(obj.name);
                    const meshPlayer = playerRef.meshPlayer;
                    meshPlayer.position = new BABYLON.Vector3(
                        parseFloat(obj.x),
                        parseFloat(obj.y),
                        parseFloat(obj.z));
                    meshPlayer.rotation = new BABYLON.Vector3(
                        parseFloat(meshPlayer.rotation.x),
                        parseFloat(obj.ry),
                        parseFloat(meshPlayer.rotation.z));
                });
                socket.on('Game::Disconnect@BC',function(msg){
                    const playerRef = Status.playerMap.get(msg);
                    for(let x of playerRef.meshs){
                        x.dispose();
                    }
                    for(let x of playerRef.skeletons){
                        x.dispose();
                    }
                    Status.playerMap.delete(msg);
                });
            }else{
                $('#rep-name').show();
            }
        });
        return false;
    });
});
exports.move = (netCache)=>{
    socket.emit('Game::SelfMove@Req',JSON.stringify(netCache));
};

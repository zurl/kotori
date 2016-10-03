/**
 *  @file Project Kotori Network Module
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-03
 */
"use strict";

const BABYLON = require("babylonjs");
const io = require("socket.io-client");
const socket = io("http://www.zhangcy.cn:4000");
const $ = require('jquery');
const Status = require('./status');

let tmp_str = "";
socket.on('Chat::SystemMsg@Res',function (msg) {
    console.log('get res');
    $("#msg-body").append(`
         <div class="bg-danger" role="alert">
             <p>System: ${(new Date()).toLocaleString()}</p>
             <p>${msg}</p>
         </div>
        `);
});
socket.on('Chat::SendMsg@Res',function (msg) {
    console.log('get res');
    $("#msg-body").append(`
         <div class="bg-${Status.currentPlayer.color}" role="alert">
             <p>${Status.currentPlayer.name}: ${(new Date()).toLocaleString()}</p>
             <p>${tmp_str}</p>
         </div>
        `);
});
$('#msg-form').submit(function(){
    console.log('sub');
    tmp_str = $('#msg-input').val();
    socket.emit('Chat::SendMsg@Req', tmp_str);
    $('#msg-input').val('');
    return false;
});

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
                $('.no-bor').show();
                resolved();
                socket.on('Game::Init@Res', async function(msg) {
                    console.log("init" + msg);
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
                socket.on('Chat::SendMsg@BC',function(msg){
                    console.log('get bc');
                    const obj = JSON.parse(msg);
                    const playerRef = Status.playerMap.get(obj.name);
                    $("#msg-body").append(`
                     <div class="bg-${playerRef.color}" role="alert">
                         <p>${playerRef.name}: ${(new Date()).toLocaleString()}</p>
                         <p>${obj.msg}</p>
                     </div>
                    `);
                });
                socket.on('Game::Disconnect@BC',function(msg){
                    Status.settings.player_number = Status.settings.player_number - 1;
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

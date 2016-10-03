/**
 *  @file Global Status Manager
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

const $ = require('jquery');

exports.playerMap = new Map();

exports.settings = {
    on_meg : false,
    __player_number : 0,
    get player_number(){
        return this.__player_number;
    },
    set player_number(a){
        $('#player-number').text(a);
        this.__player_number = a;
    }
};

function getRandomColor(){
    let colors = ["success","info","warning","danger"];
    return colors[parseInt(Math.random() * 10000) % 4];
}

exports.createPlayer = ()=>{
    exports.settings.player_number = exports.settings.player_number + 1;
    return {
        color: getRandomColor(),
    name : "",
    playAnimation : false,
    meshs : null,
    skeletons : null,
    meshPlayer : {},
    skeletonPlayer : {},
    namePlane : null,
    speed:5,
    front:0,
    back:0,
    left:0,
    right:0,
    stop:0
};};

exports.currentPlayer = exports.createPlayer();


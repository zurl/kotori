/**
 *  @file Global Status Manager
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

exports.playerMap = new Map();

exports.createPlayer = ()=>{return {
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

exports.settings = {};
/**
 *  @file Global Status Manager
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

exports.playerMap = new Map();

exports.createPlayer = ()=>{return {
    playAnimation : false,
    meshPlayer : {},
    skeletonPlayer : {},
    namePlane : null,
    __speed:5,
    get speed(){
        return this.__speed;
    },
    set speed(x){
        this.__speed = x;
    },
    __front:0,
    get front(){
        return this.__front;
    },
    set front(x){
        this.__front = x;
    },
    __back:0,
    get back(){
        return this.__back;
    },
    set back(x){
        this.__back = x;
    },
    __left:0,
    get left(){
        return this.__left;
    },
    set left(x){
        this.__left = x;
    },
    __right:0,
    get right(){
        return this.__right;
    },
    set right(x){
        this.__right = x;
    },
    __stop:0,
    get stop(){
        return this.__stop;
    },
    set stop(x){
        this.__stop = x;
    }
};};

exports.currentPlayer = exports.createPlayer();
exports.secondPlayer = exports.createPlayer();

//exports.settings = {};
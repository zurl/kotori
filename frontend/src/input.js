/**
 *  @file
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

const Status = require("./status");

exports.registerInputCallback = (scene) =>{
    console.log('reg');
    const onKeyDown = (event)=>{
        const keyCode = event.keyCode;
        const ch = String.fromCharCode(keyCode);
        switch (keyCode) {
            case 16: //Shift
                Status.currentPlayer.speed = 2.5;
                break;
            case 32: //ESC
                Status.currentPlayer.stop = 1;
                break;
        }
        console.log("debug_down");
        if (ch === "W") Status.currentPlayer.front=1;
        if (ch === "S") Status.currentPlayer.back=1;
        if (ch === "A") Status.currentPlayer.left=1;
        if (ch === "D") Status.currentPlayer.right=1;
    };


    const onKeyUp = (event)=>{
        const keyCode = event.keyCode;
        const ch = String.fromCharCode(keyCode);
        switch (keyCode) {
            case 16:  //Shift
                Status.currentPlayer.speed = 5;
                break;
            case 32: //ESC
                Status.currentPlayer.stop = 0;
                break;
        }

        if (ch === "W") Status.currentPlayer.front=0;
        if (ch === "S") Status.currentPlayer.back=0;
        if (ch === "A") Status.currentPlayer.left=0;
        if (ch === "D") Status.currentPlayer.right=0;
        Status.currentPlayer.playAnnimation = false;
        scene.stopAnimation(Status.currentPlayer.skeletonsPlayer);
    };

//Register Event Listener

    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
}






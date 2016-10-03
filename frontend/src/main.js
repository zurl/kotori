/**
 *  @file Prject Kotori Frontend Entry
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

const BABYLON = require("babylonjs");
const HandJS = require("./hand");
const Status = require("./status");
const Scene = require("./scene");
const Character = require("./character");
const Input = require('./input');
const Net = require('./net');

//garbage
let sceneCharger = false;
let PlayerCharger = false;
let cameraArcRotative = [];
let meshOctree = null;



//main
(async ()=>{
    
    const canvas = document.getElementById('screen');
    const engine = new BABYLON.Engine(canvas, true);
    engine.displayLoadingUI();
    const scene = await Scene.createScene(canvas, engine, cameraArcRotative);
    const playerMap = Status.playerMap;
    const playerName = "zcy";
    playerMap.set(playerName,Status.currentPlayer);
    
    const currentPlayer = Status.currentPlayer;
    meshOctree = await Character.createCharacter(scene,currentPlayer);
    cameraArcRotative[0].alpha = -parseFloat(currentPlayer.meshPlayer.rotation.y) + 4.69;

    //setTimeout(async ()=>{
        const secondPlayer = Status.secondPlayer;
        playerMap.set("name",secondPlayer);
        meshOctree = meshOctree.concat(await Character.createCharacter(scene,secondPlayer));
    //},1000);



    function animatActor() {
        for(let player of playerMap.values()){
            //console.log(player);
            const meshPlayer = player.meshPlayer;
            const playAnnimation = player.playAnnimation;
            const VitessePerso = player.speed;
            if(playAnnimation === false && (player.front === 1 || player.back === 1)) {
                const totalFrame = player.skeletonsPlayer._scene._activeSkeletons.data.length;
                const start = 0;
                const end = 100;
                const VitesseAnim = parseFloat(100 / 100);
                //scene.beginAnimation(player.skeletonsPlayer, (100*start)/totalFrame, (100*end)/totalFrame, true, VitesseAnim);
                player.meshPlayer.position = new BABYLON.Vector3(parseFloat(meshPlayer.position.x), parseFloat(meshPlayer.position.y), parseFloat(meshPlayer.position.z));
               // player.namePlane.position = new BABYLON.Vector3(parseFloat(meshPlayer.position.x), parseFloat(meshPlayer.position.y + 5), parseFloat(meshPlayer.position.z));
                player.playAnnimation = true;
            }
            if (player.front === 1){	// En avant
                const forward = new BABYLON.Vector3(parseFloat(Math.sin(parseFloat(meshPlayer.rotation.y))) / VitessePerso, 0.5, parseFloat(Math.cos(parseFloat(meshPlayer.rotation.y))) / VitessePerso).negate();
                meshPlayer.moveWithCollisions(forward);
                //player.namePlane.moveWithCollisions(forward);
            }
            else if (player.back === 1) { // En arriere
                const backwards = new BABYLON.Vector3(parseFloat(Math.sin(parseFloat(meshPlayer.rotation.y))) / VitessePerso, -0.5, parseFloat(Math.cos(parseFloat(meshPlayer.rotation.y))) / VitessePerso);
                meshPlayer.moveWithCollisions(backwards);
                //player.namePlane.moveWithCollisions(backwards);
            }
        }
    }
    function CameraFollowActor()
    {
        const meshPlayer = currentPlayer.meshPlayer;
        meshPlayer.rotation.y = -4.69 - cameraArcRotative[0].alpha;
        cameraArcRotative[0].target.x = parseFloat(meshPlayer.position.x);
        cameraArcRotative[0].target.z = parseFloat(meshPlayer.position.z);
    }

    scene.registerBeforeRender(function(){
        if(scene.isReady()) {
            if(sceneCharger === false) {
                engine.hideLoadingUI();
                sceneCharger = true;
            }
            animatActor();
        }
    });

    await Net.linkServer();
    
    engine.runRenderLoop(function () {
        //console.log(scene);
        scene.render();
        if(scene.isReady()){

            CameraFollowActor();

            if(PlayerCharger === false) {
                console.log("debug");
                //scene.stopAnimation(skeletonsPlayer[0]);
                PlayerCharger = true;
                for(let player of playerMap.values()){
                    scene.stopAnimation(player.skeletonsPlayer);
                }

                const octree = scene.createOrUpdateSelectionOctree();
                for(var i = 0; i < meshOctree.length; i++) {
                    octree.dynamicContent.push(meshOctree[i]);
                }
            }
        }
    });
    Input.registerInputCallback(scene);
    window.addEventListener("resize", function () { engine.resize();});

})();






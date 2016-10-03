/**
 *  @file Character Creator
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

const BABYLON = require("babylonjs");
const Status = require("./status");

// Character import

exports.createCharacter = (scene, player) => new Promise((resolved, rejected)=> {
    BABYLON.SceneLoader.ImportMesh("", "./assets/character_4/", "him.babylon", scene,
        (newMeshes, particleSystems, skeletons) => {
            try {
                const meshPlayer = newMeshes[3];
                player.meshPlayer = meshPlayer;
                for (let x of newMeshes) {
                    if (x != meshPlayer)x.parent = meshPlayer;
                }
                meshPlayer.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
                meshPlayer.position = new BABYLON.Vector3(-5.168, 1.392, -7.463);
                meshPlayer.rotation = new BABYLON.Vector3(0, 3.9, 0);
                player.skeletonsPlayer = skeletons[1];
                var totalFrame = skeletons[0]._scene._activeSkeletons.data.length;
                var start = 0;
                var end = 100;
                var vitesse = 100 / 100;
                //scene.beginAnimation(skeletons[0],
                // 100 * start / totalFrame, 100 * end / totalFrame, true,
                // vitesse);
                for (let x of skeletons)scene.stopAnimation(x);
                player.namePlane = BABYLON.Mesh.CreatePlane("Mur", 1, scene);
                player.namePlane.wireframe = true;
                player.namePlane.scaling = new BABYLON.Vector3(50, 25, 1);
                player.namePlane.position = new BABYLON.Vector3(0, 180, 0);
                player.namePlane.rotation = new BABYLON.Vector3(0, 3.14, 0);
                var backgroundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
                backgroundTexture.hasAlpha = true;
                player.namePlane.material = new BABYLON.StandardMaterial("background", scene);
                player.namePlane.material.diffuseTexture = backgroundTexture;
                player.namePlane.material.backFaceCulling = false;
                player.namePlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
                player.namePlane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
                var context2D = backgroundTexture.getContext();
                context2D.clearRect(0, 0, 512, 512);
                backgroundTexture.drawText("叶靖琛", 0, 140, "bold 140px verdana", "black", "transparent");
                
                meshPlayer.checkCollisions = true;
                meshPlayer.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
                meshPlayer.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
                meshPlayer.applyGravity = true;
                player.namePlane.parent = meshPlayer;
                
                resolved(newMeshes);
            } catch (e) {
                console.log(e);
            }
        }
    );

});

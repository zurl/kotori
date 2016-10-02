/**
 *  @file Character Creator
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";

const BABYLON = require("babylonjs");
const Status = require("./status");

// Character import

exports.createCharacter = (scene, player) => new Promise((resolved,rejected)=>{
  //backgroundTexture.drawText("- browsers statistics -", null, 250, "35px Segoe UI", "white", null);



        BABYLON.SceneLoader.ImportMesh("", "./assets/character/", "him.babylon", scene,
        (newMeshes, particleSystems, skeletons) => {
                try{
                const meshPlayer = newMeshes[0];
                player.meshPlayer = meshPlayer;
                meshPlayer.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
                meshPlayer.position = new BABYLON.Vector3(-5.168, 1.392, -7.463);
                meshPlayer.rotation = new BABYLON.Vector3(0, 3.9, 0);
                player.skeletonsPlayer = skeletons[0];
                var totalFrame = skeletons[0]._scene._activeSkeletons.data.length;
                var start = 0;
                var end = 100;
                var vitesse = 100 / 100;
                scene.beginAnimation(skeletons[0], 100 * start / totalFrame, 100 * end / totalFrame, true, vitesse);





                        player.namePlane = BABYLON.Mesh.CreatePlane("Mur", 1, scene);
                        player.namePlane.wireframe = true;
                        player.namePlane.scaling = new BABYLON.Vector3(50, 25, 1);
                        player.namePlane.position = new BABYLON.Vector3(0, 80, 0);
                        player.namePlane.rotation = new BABYLON.Vector3(0, 3.14, 0);
                        //player.namePlane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
                         var backgroundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
                        backgroundTexture.hasAlpha = true;
                        //const Mur = BABYLON.Mesh.CreateBox("Mur", 1, scene);
                        player.namePlane.material = new BABYLON.StandardMaterial("background", scene);
                        player.namePlane.material.diffuseTexture = backgroundTexture;
                        player.namePlane.material.backFaceCulling = false;
                        player.namePlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
                        //outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
                        //player.namePlane.material.diffuseTexture.hasAlpha = true;
                        //player.namePlane.material.useAlphaFromDiffuseTexture = true;
                        //instead of myMaterial.alpha


                        //player.namePlane.material.ambientTexture = new BABYLON.Texture("https://dl.dropboxusercontent.com/u/17799537/babytest/light.gif", scene);
                        //player.namePlane.material.specularColor = BABYLON.Color3.Black();
                        player.namePlane.material.emissiveColor = new BABYLON.Color3(1,1,1);
                       // Status.settings.light.excludedMeshes.push(player.namePlane);
                        // Mur.scaling = new BABYLON.Vector3(2, 1, 0.1);
                        // Mur.position.x = -5.168;
                        // Mur.position.y = 6.392;
                        // Mur.position.z = -7.463;
                        // Mur.checkCollisions = true;
                        // Mur.material.diffuseTexture = backgroundTexture;
                        var context2D = backgroundTexture.getContext();
                        //var output = function(label, data) {
                                context2D.clearRect(0, 0, 512, 512);
                        backgroundTexture.drawText("叶靖琛", 0, 140, "bold 140px verdana", "black", "transparent");
                        //backgroundTexture.drawText("asdasdasd", 0, 300, "140px verdana", "black", "transparent");
                        //}

                        meshPlayer.checkCollisions = true;
                meshPlayer.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
                meshPlayer.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
                meshPlayer.applyGravity = true;

                        player.namePlane.parent = meshPlayer;

                //meshPlayer.createOrUpdateSubmeshesOctree().push(Mur);
                resolved(newMeshes);
        }catch(e){
                        console.log(e);
                }
        }
    );

});

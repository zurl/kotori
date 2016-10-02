/**
 *  @file Scene File
 *  @author Zhang Chengyi <zurl@live.com>
 *  Created at 2016-10-01
 */
"use strict";
const BABYLON = require("babylonjs");
const Status = require("./status");

const groundHeightSrc =  "assets/pic/map.jpg";
const groundTextureSrc = "assets/pic/terr_g.jpg";

exports.createScene = (canvas, engine, cameraArcRotative) => new Promise((resolved,rejected)=>{
    //Initialization
    const scene = new BABYLON.Scene(engine);

    //Active gravity and collision
    scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
    scene.collisionsEnabled = true;

    // Light directional
    const LightDirectional = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-2, -4, 2), scene);
    LightDirectional.diffuse = new BABYLON.Color3(1, 1, 1);
    LightDirectional.specular = new BABYLON.Color3(0, 0, 0);
    LightDirectional.position = new BABYLON.Vector3(250, 400, 0);
    LightDirectional.intensity = 1.8;
    //Status.settings.light = LightDirectional;

    // Camera 3 eme personnel
    cameraArcRotative[0] = new BABYLON.ArcRotateCamera("CameraBaseRotate", -Math.PI/2, Math.PI/2.2, 12, new BABYLON.Vector3(0, 5.0, 0), scene);
    cameraArcRotative[0].wheelPrecision = 15;
    cameraArcRotative[0].lowerRadiusLimit = 2;
    cameraArcRotative[0].upperRadiusLimit = 22;
    cameraArcRotative[0].minZ = 0;
    cameraArcRotative[0].minX = 4096;
    scene.activeCamera = cameraArcRotative[0];
    cameraArcRotative[0].attachControl(canvas);

   // Terrain
    const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", groundHeightSrc, 100, 100, 100, 0, 12, scene, true);
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture(groundTextureSrc, scene);
    groundMaterial.diffuseTexture.uScale = 5.0;
    groundMaterial.diffuseTexture.vScale = 5.0;
    ground.material = groundMaterial;
    ground.checkCollisions = true;

    // Wall




    var backgroundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);

    const Mur = BABYLON.Mesh.CreateBox("Mur", 1, scene);
    Mur.material = new BABYLON.StandardMaterial("background", scene);
    Mur.material.diffuseTexture = backgroundTexture;
    Mur.scaling = new BABYLON.Vector3(15, 6, 1);
    Mur.position.y = 3.1;
    Mur.position.z = 20;
    Mur.checkCollisions = true;
    Mur.material.diffuseTexture = backgroundTexture;
    backgroundTexture.drawText("浙江温州", null, 80, "bold 70px Segoe UI", "white", "#555555");
    backgroundTexture.drawText("江南皮革厂倒闭了", null, 250, "35px Segoe UI", "white", null);






    //SkyBox
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/pic/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.renderingGroupId = 0;
    resolved(scene);
});
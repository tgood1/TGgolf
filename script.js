// @ts-check

// Import Three.js and related modules
import * as T from './libs/three.module.js';
import {OrbitControls} from './libs/OrbitControls.js';

// Import Cannon.js
// @ts-ignore
import * as CANNON from './libs/cannon-es.js';

// Import custom modules
import { TGWall } from "./TGWall.js";
// import { TGCup } from "./TGCup.js";
import { Hole1 } from "./Hole1.js";
import { Hole2 } from "./Hole2.js";
import { Hole3 } from "./Hole3.js";
import { Hole4 } from "./Hole4.js";
import { Hole5 } from "./Hole5.js";
import { Hole6 } from "./Hole6.js";
import { Hole7 } from "./Hole7.js";
import { Hole8 } from "./Hole8.js";
import { Hole9 } from "./Hole9.js";

// Constants
const windowWidth = 700;
const windowHeight = 700;

// Renderer setup
const renderer = new T.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

// Scene setup
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(65, windowWidth / windowHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

// Lighting setup
const ambientLight = new T.AmbientLight(0x404040, 10);
scene.add(ambientLight);

const pointLight = new T.PointLight("white", 1, 0, 0);
// @ts-ignore
pointLight.position.set(20, 10, 15);
scene.add(pointLight);

// Ball setup
const ballGeo = new T.SphereGeometry(2, 50, 50);
const normalTexture = new T.TextureLoader().load("./dimples_normal.jpg");
let ballMat = new T.MeshStandardMaterial({normalMap: normalTexture})
// @ts-ignore
const ballMesh = new T.Mesh( ballGeo, ballMat);
scene.add(ballMesh);


const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -100, 0)
});


const ballPhysMat = new CANNON.Material("ballMaterial");

const ballBody = new CANNON.Body({
    mass: 4,
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0, 2, 0),
    material: ballPhysMat
});
world.addBody(ballBody);
ballBody.linearDamping = 0.25;
ballBody.angularDamping = 0.25;


// wall material and contact material
const wallPhysMat = new CANNON.Material("WallMaterial");
// wallPhysMat.friction = 0.0;
const ballWallMat = new CANNON.ContactMaterial(
    wallPhysMat,
    ballPhysMat,
    {restitution: 0.8},

);

let AIMLINE;
let AIM_ANGLE = 0;
let POWER = 10;
const ANGLE_DIFF = 0.01;
let currentHole;
let moveCamera = true;
let aimSlider = /** @type {HTMLElement} */ (document.getElementById("aimSlider"));
let powerSlider = /** @type {HTMLElement} */ (document.getElementById("power"));
let holeLabelDiv = /**@type {HTMLElement} */ (document.getElementById("holeLabel"));



function startHole (holeObject, holeLabel, aimAngle) {
    if (currentHole != null) currentHole.clearAll(); // clear the existing hole if there is one
    currentHole = holeObject;
    ballBody.position.set(currentHole.BallStartPos.x, currentHole.BallStartPos.y, currentHole.BallStartPos.z);
    ballBody.velocity.set(0, 0, 0);
    ballBody.angularVelocity.set(0,0,0);
    AIM_ANGLE = aimAngle ?? 0;
    //@ts-ignore
    aimSlider.value = - AIM_ANGLE * 100 / Math.PI;
    POWER = 10;
    //@ts-ignore
    powerSlider.value = POWER;
    holeLabelDiv.innerHTML = holeLabel;
    resetCamera();
}

// start with Hole #1
startHole(new Hole1(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 1");

// left/right arrow key input will update the AIM_ANGLE and the aim slider display

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case "ArrowLeft":
            // left arrow key
            event.preventDefault();
            AIM_ANGLE += ANGLE_DIFF;
            if (AIM_ANGLE > Math.PI) AIM_ANGLE -= 2 * Math.PI;
            //@ts-ignore
            aimSlider.value = - AIM_ANGLE * 100 / Math.PI;
            if (moveCamera) resetCamera();
            break;
        case "ArrowRight":
            // right arrow key
            event.preventDefault();
            AIM_ANGLE -= ANGLE_DIFF;
            if (AIM_ANGLE < - Math.PI) AIM_ANGLE += 2 * Math.PI;
            //@ts-ignore
            aimSlider.value = - AIM_ANGLE * 100 / Math.PI;
            if (moveCamera) resetCamera();
            break;
    }
});

// const timeStep = 1 / 24;
const timeStep = 1/ 50;
const MINVELOCITY = 1;
let isBallMoving = false;

let lastBallPosition = new CANNON.Vec3(0, 0, 0);
// let CAMERA_MOTION_ENABLED = true;
function animate() {
    world.step(timeStep);
	//@ts-ignore
    ballMesh.position.copy(ballBody.position); 
	//@ts-ignore
    ballMesh.quaternion.copy(ballBody.quaternion);

    renderer.render(scene, camera);
	requestAnimationFrame(animate);
    scene.remove(AIMLINE);
	if (ballBody.velocity.length() <= MINVELOCITY) {
        // ball is not moving
		ballBody.velocity.set(0,0,0);
		ballBody.angularVelocity.set(0,0,0);
        
        if (isBallMoving) {
            // only do these things once when the ball stops
            // @ts-ignore
            orbit.target = new T.Vector3(ballBody.position.x, ballBody.position.y, ballBody.position.z);
            // lastBallPosition.x = ballBody.position.x;
            // lastBallPosition.z = ballBody.position.z;
            // lastBallPosition.y = ballBody.position.y;
        }    
        isBallMoving = false;
        // only draw the aim line if the ball isn't moving
        drawAimLine(AIM_ANGLE, 10 + POWER /4);
        
        
    } else {
        // ball is moving
        isBallMoving = true;
        if (moveCamera) {
            // @ts-ignore
            camera.position.set(ballBody.position.x - 100 * Math.sin(AIM_ANGLE), ballBody.position.y + 80, ballBody.position.z - 100 * Math.cos(AIM_ANGLE));
            // @ts-ignore
            orbit.target = new T.Vector3(ballBody.position.x, ballBody.position.y, ballBody.position.z);
            camera.lookAt(ballBody.position.x, ballBody.position.y, ballBody.position.z);
        }
    }
    // replace the ball if it fell off the ground
    if (ballBody.position.y < -150) resetBallToLastPosition();
}

animate();

function rollBall(AIM_ANGLE, POWER) {
    ballBody.velocity.set(POWER * Math.sin(AIM_ANGLE), 0, POWER * Math.cos(AIM_ANGLE));
}

// If camera controls are being used, stop updating camera position automatically
orbit.addEventListener('start', function () {
    moveCamera = false;
});

// draw a line in the direction the shot will go
function drawAimLine(angle, length) {
    let lineMaterial = new T.LineBasicMaterial({
        color: "gold",
    });
    let points = [];
    points.push(new T.Vector3(2 * Math.sin(angle) + ballBody.position.x, ballBody.position.y - 1.9, 2 * Math.cos(angle) + ballBody.position.z));
    points.push(new T.Vector3(length * Math.sin(angle) + ballBody.position.x, ballBody.position.y -1.9, length * Math.cos(angle) + ballBody.position.z));
    let lineGeom = new T.BufferGeometry().setFromPoints(points);
    let aimLine = new T.Line(lineGeom, lineMaterial);
    scene.add(aimLine);
    // assign to a global variable so we can remove it from the scene when needed
    AIMLINE = aimLine;

}


// reset camera button. Moves camera to point down the AIMLINE and reenables the automatic movement
/** @type {HTMLElement} */(document.getElementById("resetCamera")).onclick = function () {
    resetCamera();
}

function resetCamera() {
    //@ts-ignore
    camera.position.set(ballBody.position.x - 100 * Math.sin(AIM_ANGLE), ballBody.position.y + 80, ballBody.position.z - 100 * Math.cos(AIM_ANGLE));
    //@ts-ignore
    orbit.target = new T.Vector3(ballBody.position.x, ballBody.position.y, ballBody.position.z);
    camera.lookAt(ballBody.position.x, ballBody.position.y, ballBody.position.z);
    moveCamera = true;
}

// hit the ball when button is clicked!
let hitButton = /** @type {HTMLElement} */ (document.getElementById("rollBall"));
hitButton.onclick = function () {
    if (!isBallMoving) {
        lastBallPosition.x = ballBody.position.x;
        lastBallPosition.z = ballBody.position.z;
        lastBallPosition.y = ballBody.position.y;
        rollBall(AIM_ANGLE, POWER)
    };
}

// update power from slider value

powerSlider.oninput = function () {
    //@ts-ignore
    POWER = powerSlider.value;
}

// update aim from slider value
aimSlider.oninput = function () {
    // @ts-ignore
    AIM_ANGLE = -(aimSlider.value ) * Math.PI /100;
    if (moveCamera) resetCamera();
    
}

// reset ball to last shot
// let resetBallButton = /** @type {HTMLElement} */ (document.getElementById("resetBall"));
// resetBallButton.onclick = function () {
//     resetBallToLastPosition();
// }

function resetBallToLastPosition() {
    ballBody.position.x = lastBallPosition.x;
    ballBody.position.y = lastBallPosition.y;
    ballBody.position.z = lastBallPosition.z;
    ballBody.velocity.set(0, 0, 0);
    ballBody.angularVelocity.set(0,0,0);
    resetCamera();
}

// update power from slider value
let hole1Button = /** @type {HTMLElement} */ (document.getElementById("hole1"));
let hole2Button = /** @type {HTMLElement} */ (document.getElementById("hole2"));
let hole3Button = /** @type {HTMLElement} */ (document.getElementById("hole3"));
let hole4Button = /** @type {HTMLElement} */ (document.getElementById("hole4"));
let hole5Button = /** @type {HTMLElement} */ (document.getElementById("hole5"));
let hole6Button = /** @type {HTMLElement} */ (document.getElementById("hole6"));
let hole7Button = /** @type {HTMLElement} */ (document.getElementById("hole7"));
let hole8Button = /** @type {HTMLElement} */ (document.getElementById("hole8"));
let hole9Button = /** @type {HTMLElement} */ (document.getElementById("hole9"));
hole1Button.onclick = function () {
    startHole(new Hole1(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 1");
}
hole2Button.onclick = function () {
    startHole(new Hole2(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 2");
}
hole3Button.onclick = function () {
    startHole(new Hole3(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 3");
}
hole4Button.onclick = function () {
    startHole(new Hole4(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 4", - Math.PI/2);
}
hole5Button.onclick = function () {
    startHole(new Hole5(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 5");
}
hole6Button.onclick = function () {
    startHole(new Hole6(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 6");
}
hole7Button.onclick = function () {
    startHole(new Hole7(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 7");
}
hole8Button.onclick = function () {
    startHole(new Hole8(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 8");
}
hole9Button.onclick = function () {
    startHole(new Hole9(world, scene, wallPhysMat, {y:0}, ballWallMat), "HOLE 9");
}
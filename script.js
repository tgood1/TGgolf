// @ts-check
import * as T from "./libs/three/build/three.module.js";
import { OrbitControls } from "./libs/three/examples/jsm/controls/OrbitControls.js";
//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
// import { TGWall } from "./TGWall.js";
// import { TGCup } from "./TGCup.js";
import { Hole1 } from "./Hole1.js";

const windowWidth = 700;
const windowHeight = 700;

const renderer = new T.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(
	65,
	windowWidth / windowHeight,
	0.1,
	1000
);
const orbit = new OrbitControls(camera, renderer.domElement);


const ambientLight = new T.AmbientLight(0x404040,10);
scene.add(ambientLight);
let point = new T.PointLight("white", 1, 0, 0);
//@ts-ignore
point.position.set(20, 10, 15);
scene.add(point);



const sphereGeo = new T.SphereGeometry(2, 50, 50);

let normalTexture = new T.TextureLoader().load("./dimples_normal.jpg");
let sphereMat = new T.MeshStandardMaterial({normalMap: normalTexture})
// @ts-ignore
const sphereMesh = new T.Mesh( sphereGeo, sphereMat);
scene.add(sphereMesh);


const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});


const spherePhysMat = new CANNON.Material("SphereMaterial");

const sphereBody = new CANNON.Body({
    mass: 4,
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0, 2, 0),
    material: spherePhysMat
});
world.addBody(sphereBody);
// sphereBody.velocity.set(14, 0, 1);
sphereBody.linearDamping = 0.25;
sphereBody.angularDamping = 0.25;


// wall material and contact material
const wallPhysMat = new CANNON.Material("WallMaterial");
const sphereWallMat = new CANNON.ContactMaterial(
    wallPhysMat,
    spherePhysMat,
    {restitution: 0.8},
);


let hole1 = new Hole1(world, scene, wallPhysMat, {y:3}, sphereWallMat);
let AIMLINE;
let AIM_ANGLE = 0;
let POWER = 10;
const ANGLE_DIFF = 0.05;
function startHole1(){
    sphereBody.position.set(hole1.BallStartPos.x, hole1.BallStartPos.y, hole1.BallStartPos.z);
    sphereBody.velocity.set(0, 0, 0);
}

startHole1();

let aimSlider = /** @type {HTMLElement} */ (document.getElementById("aimSlider"));
document.addEventListener('keydown', function(event) {
    // listen for arrow key input
    switch(event.key) {
        case "ArrowLeft":
            // left arrow key
            event.preventDefault();
            AIM_ANGLE += ANGLE_DIFF;
            aimSlider.value = (- AIM_ANGLE * 100 / Math.PI) % 100;
            break;
        case "ArrowRight":
            // right arrow key
            event.preventDefault();
            AIM_ANGLE -= ANGLE_DIFF;
            aimSlider.value = (- AIM_ANGLE * 100 / Math.PI) % 100;
            break;
    }
});

const timeStep = 1 / 24;
const MINVELOCITY = .2;
let isBallMoving = false;
let moveCamera = true;
function animate() {
    world.step(timeStep);
	//@ts-ignore
    sphereMesh.position.copy(sphereBody.position); 
	//@ts-ignore
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    renderer.render(scene, camera);
	requestAnimationFrame(animate);
    scene.remove(AIMLINE);
	if (sphereBody.velocity.length() <= MINVELOCITY) {
		sphereBody.velocity.set(0,0,0);
		sphereBody.angularVelocity.set(0,0,0);
        // @ts-ignore
        if (isBallMoving) orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        isBallMoving = false;
        drawAimLine(AIM_ANGLE, 10);
    } else {
        isBallMoving = true;
        if (moveCamera) {
            // @ts-ignore
            camera.position.set(sphereBody.position.x, sphereBody.position.y + 80, sphereBody.position.z-100);
            // @ts-ignore
            orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
            camera.lookAt(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        }
    }
    
    
    
}

animate();

function rollBall(AIM_ANGLE, POWER) {
    sphereBody.velocity.set(POWER * Math.sin(AIM_ANGLE), 0, POWER * Math.cos(AIM_ANGLE));
    console.log("AIM_ANGLE: " + AIM_ANGLE);
    console.log("POWER: " + POWER);
}

orbit.addEventListener('start', function () {
    // If controls are being used, stop updating camera position automatically
    moveCamera = false;
});

function drawAimLine(angle, length) {
    let lineMaterial = new T.LineBasicMaterial({
        color: "gold",
    });
    let points = [];
    points.push(new T.Vector3(2 * Math.sin(angle) + sphereBody.position.x, sphereBody.position.y - 1.9, 2 * Math.cos(angle) + sphereBody.position.z));
    points.push(new T.Vector3(length * Math.sin(angle) + sphereBody.position.x, sphereBody.position.y -1.9, length * Math.cos(angle) + sphereBody.position.z));
    let lineGeom = new T.BufferGeometry().setFromPoints(points);
    let aimLine = new T.Line(lineGeom, lineMaterial);
    scene.add(aimLine);
    AIMLINE = aimLine;

}


// reset camera button. Moves camera back into place and restarts the automatic movement
/** @type {HTMLElement} */(document.getElementById("resetCamera")).onclick = function () {
    //@ts-ignore
    camera.position.set(sphereBody.position.x, sphereBody.position.y + 80, sphereBody.position.z-100);
    //@ts-ignore
    orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
    camera.lookAt(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
    moveCamera = true;
}

let hitButton = /** @type {HTMLElement} */ (document.getElementById("rollBall"));
// hit the ball when button is clicked!
hitButton.onclick = function () {
    if (!isBallMoving) rollBall(AIM_ANGLE, POWER);
}

let powerSlider = /** @type {HTMLElement} */ (document.getElementById("power"));
// update power from slider value
powerSlider.onchange = function () {
    //@ts-ignore
    POWER = powerSlider.value;
}

// update power from slider value
aimSlider.oninput = function () {
    // @ts-ignore
    AIM_ANGLE = -(aimSlider.value ) * Math.PI /100;
}
// @ts-check
import * as T from "./libs/three/build/three.module.js";
import { OrbitControls } from "./libs/three/examples/jsm/controls/OrbitControls.js";
// import Stats from './libs/three/examples/jsm/libs/stats.module.js'
// import { GroundPlane } from "./GroundPlane.js";
//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGWall } from "./TGWall.js";
import { TGCup } from "./TGCup.js";
import { Hole1 } from "./Hole1.js";

const renderer = new T.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
//@ts-ignore
// camera.position.set(0, 20, -30);
orbit.update();

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


// let groundGeom = new T.BoxGeometry(50, 1, 50);
// let groundMat = new T.MeshStandardMaterial({color: "green"});
// // @ts-ignore
// let groundMesh = new T.Mesh(groundGeom, groundMat);
// scene.add(groundMesh)

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

// const groundPhysMat = new CANNON.Material("GroundMaterial");

// const groundBody = new CANNON.Body({
// 	shape: new CANNON.Box(new CANNON.Vec3(25, .5, 25)),
//     type: CANNON.Body.STATIC,
//     material: groundPhysMat
// });
// world.addBody(groundBody);

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

// const groundSphereContactMat = new CANNON.ContactMaterial(
//     groundPhysMat,
//     spherePhysMat,
//     {restitution: 0.3}
// );

// world.addContactMaterial(groundSphereContactMat);

// wall material and contact material
const wallPhysMat = new CANNON.Material("WallMaterial");
const sphereWallMat = new CANNON.ContactMaterial(
    wallPhysMat,
    spherePhysMat,
    {restitution: 0.8},
);

// make and add a wall
// let tgWall = new TGWall(world, scene, wallPhysMat, {x:5, z:10, color: 0xFF0000}, sphereWallMat);

// make the cup?
// let cup = new TGCup(world, scene, wallPhysMat, {y: 0, x:30, z:0}, groundSphereContactMat)
let hole1 = new Hole1(world, scene, wallPhysMat, {y:3}, sphereWallMat);
// console.log(hole1.BallStartPos);

function startHole1(){
    sphereBody.position.set(hole1.BallStartPos.x, hole1.BallStartPos.y, hole1.BallStartPos.z);
    camera.position.set(hole1.BallStartPos.x, hole1.BallStartPos.y + 100, hole1.BallStartPos.z - 150);
    camera.lookAt(sphereMesh);
    orbit.update();
    sphereBody.velocity.set(0, 0, 60);
    orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
    // orbit.target = new T.Vector3(hole1.BallStartPos.x, hole1.BallStartPos.y, hole1.BallStartPos.z);

}

startHole1();

const timeStep = 1 / 24;
const MINVELOCITY = .2;
let isBallMoving = false;

function animate() {
    world.step(timeStep);

	//@ts-ignore
    // groundMesh.position.copy(groundBody.position); 
	// //@ts-ignore
    // groundMesh.quaternion.copy(groundBody.quaternion);

	//@ts-ignore
    sphereMesh.position.copy(sphereBody.position); 
	//@ts-ignore
    sphereMesh.quaternion.copy(sphereBody.quaternion);


    renderer.render(scene, camera);
	requestAnimationFrame(animate);
	if (sphereBody.velocity.length() <= MINVELOCITY) {
		sphereBody.velocity.set(0,0,0);
		sphereBody.angularVelocity.set(0,0,0);
        // toggleOrbitControls(true);
        if (isBallMoving) orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        isBallMoving = false;
    } else {
        // toggleOrbitControls(false);
        isBallMoving = true;
        // camera.position.set(sphereBody.position.x, sphereBody.position.y + 20, sphereBody.position.z-60);
    }
    // orbit.target = new T.Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
	// console.log("Position:  ("+sphereBody.position.x.toFixed(2) + ", "+sphereBody.position.y.toFixed(2)+", "+sphereBody.position.z.toFixed(2)+")")
	// console.log("Velocity:  ("+sphereBody.velocity.x.toFixed(2) + ", "+sphereBody.velocity.y.toFixed(2)+", "+sphereBody.velocity.z.toFixed(2)+")")
	
}

animate();

function toggleOrbitControls(enabled){
    orbit.enabled = enabled;
}
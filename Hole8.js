//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";
import { TGWall } from './TGWall.js';


export class Hole8 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		// floors
		objectAry.push(new TGPlatform(world, scene, physMat, {z:0, width: 50, rotationX: 0, length:150}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 50, width: 150,z: z +100, y: y , x: x -50, color: "green"}, contactMat));

		// walls
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 150,z: z +125, y: y + 2.5, x: x - 50, color: "green"}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 40,z: z +110, y: y + 2.5, x: x  +10, color: "green", rotationY: Math.PI/4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z +110, y: y + 2.5, x: x  - 90, color: "yellow", rotationY: Math.PI/4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 100,z: z +75, y: y + 2.5, x: x - 75, color: "green"}, contactMat));
		
		// cup
		objectAry.push(new HoleAssembly(world, scene, physMat, {x: -150, y: 0, z: 100}, contactMat));

		this.objects = objectAry;

		this.BallStartPos = new CANNON.Vec3(x, y +4, z - 60);
	}

	// removes all THREE.js and CANNON.js objects from the scene/world
	clearAll() {
		this.objects.forEach((object) => {
			object.remove();
		});
	}
}
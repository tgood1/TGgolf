//@ts-ignore
import * as CANNON from './libs/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";
import { TGWall } from './TGWall.js';


export class Hole5 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		// floors
		objectAry.push(new TGPlatform(world, scene, physMat, {z: 80, width: 50, rotationX: 0, length:310}, contactMat));

		// walls
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z, y: y + 2.5, x: x , color:"yellow", rotationY: Math.PI/4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z + 50, y: y + 2.5, x: x + 14 , color:"yellow", rotationY: -Math.PI/4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z + 50, y: y + 2.5, x: x -14, color:"yellow", rotationY: Math.PI/4}, contactMat));
		
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z +140, y: y + 2.5, x: x , color:"yellow", rotationY: Math.PI/4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 30,z: z +140, y: y + 2.5, x: x , color:"yellow", rotationY: -Math.PI/4}, contactMat));
		// cup
		objectAry.push(new HoleAssembly(world, scene, physMat, {x: 0, y: 0, z: 250}, contactMat));

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
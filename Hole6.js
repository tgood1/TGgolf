//@ts-ignore
import * as CANNON from './libs/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";
import { TGWall } from './TGWall.js';


export class Hole6 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		// floors
		objectAry.push(new TGPlatform(world, scene, physMat, {z:-50, width: 50, rotationX: 0, length:50}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {x: 20, z:25, width: 10, rotationX: 0, length:100}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {z: 100, width: 50, rotationX: 0, length:50}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {x: -20, z:175, width: 10, rotationX: 0, length:100}, contactMat));

		// walls
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 40,z: z +125, y: y + 2.5, x: x + 5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 40,z: z +75, y: y + 2.5, x: x - 5}, contactMat));
		
		// cup
		objectAry.push(new HoleAssembly(world, scene, physMat, {x: -20, y: 0, z: 240}, contactMat));

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
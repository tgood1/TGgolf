//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";
import { TGWall } from './TGWall.js';


export class Hole7 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		// floors
		objectAry.push(new TGPlatform(world, scene, physMat, {z:-50, width: 50, rotationX: 0, length:50}, contactMat));

		objectAry.push(new TGPlatform(world, scene, physMat, {z: 100, width: 250, rotationX: 0, length:260}, contactMat));


		// walls
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 140,z: z +75, y: y + 2.5, x: x - 50, color: "yellow", rotationY: Math.PI / 4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 140,z: z +75, y: y + 2.5, x: x + 50, color: "yellow", rotationY: -Math.PI / 4}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 105,z: z +145, y: y + 2.5, x: x - 50, color: "yellow", rotationY: -Math.PI / 8}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 105,z: z +145, y: y + 2.5, x: x + 50, color: "yellow", rotationY: Math.PI / 8}, contactMat));
		
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
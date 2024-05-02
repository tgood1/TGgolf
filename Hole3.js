//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";


export class Hole3 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		objectAry.push(new TGPlatform(world, scene, physMat, {z: -90, width: 50, rotationX: 0, length: 100}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {y: 8, length: 30, z: -30, width: 50, rotationX: -Math.PI / 6}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {y: -3, length: 80, z: 30, width: 50, rotationX: 0}, contactMat));
		objectAry.push(new TGPlatform(world, scene, physMat, {y: 5, length: 30, z: 50, width: 50, rotationX: -Math.PI / 6}, contactMat));

		objectAry.push(new TGPlatform(world, scene, physMat, {y: -5, length: 180, z: 255, width: 50, rotationX: 0}, contactMat));
		
		
		objectAry.push(new HoleAssembly(world, scene, physMat, {x: 0, y: -5, z: 150}, contactMat));

		this.objects = objectAry;

		this.BallStartPos = new CANNON.Vec3(x, y +4, z - 130);
	}

	// removes all THREE.js and CANNON.js objects from the scene/world
	clearAll() {
		this.objects.forEach((object) => {
			object.remove();
		});
	}
}
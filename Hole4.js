//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGPlatform } from "./TGPlatform.js";
import { HoleAssembly } from "./HoleAssembly.js";
import { TGWall } from './TGWall.js';


export class Hole4 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		// floors
		objectAry.push(new TGPlatform(world, scene, physMat, {z: -40, width: 50, rotationX: 0, length: 60}, contactMat));
		objectAry.push(new TGWall(world, scene, physMat, {z: 10, x: -50, y: 20, height: 1, width: 200, depth: 100, rotationX: - Math.PI/6}, contactMat));
		objectAry.push(new TGWall(world, scene, physMat, {z: -50, x: -150, y: -5, height: 1, width: 100, depth: 100, rotationX: 0}, contactMat));
		
		// cup
		objectAry.push(new HoleAssembly(world, scene, physMat, {x: -210, y: -5, z: -50}, contactMat));

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
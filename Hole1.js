import * as T from "./libs/three/build/three.module.js";
//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';

import { TGWall } from "./TGWall.js";
import { TGCup } from "./TGCup.js";

export class Hole1 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 200, width: 50, y: y, z: z -110, color: "green"}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 30, width: 50, y: y, z: z + 20}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x + 15}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x - 15}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 230, rotationY: Math.PI / 2,z: z - 80, y: y + 2.5, x: x - 24.5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 230, rotationY: Math.PI / 2,z: z - 80, y: y + 2.5, x: x + 24.5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 50, z: z + 35, y: y + 2.5, x: x}, contactMat));

		objectAry.push(new TGCup(world, scene, physMat, {y: y}, contactMat));
		this.objects = objectAry;

		this.BallStartPos = new CANNON.Vec3(x, y +4, z - 200);
	}

	// removes all THREE.js and CANNON.js objects from the scene/world
	clearAll() {
		this.objects.forEach((object) => {
			object.remove();
		});
	}
}
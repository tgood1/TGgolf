//@ts-ignore
import * as CANNON from './libs/cannon-es.js';

import { TGWall } from "./TGWall.js";
import { TGCup } from "./TGCup.js";


export class Hole2 {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 240, width: 50, y: y, z: z -90, color: "green"}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 200, width: 50,x: x -60, y: y, z: z -70, color: "green"}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 50,x:x-60, y: y, z: z - 200}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x + -45, z: z-180}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 50, width: 10, y: y, x: x - 30, z: z + 5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x - 75, z: z-180}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 190, rotationY: Math.PI / 2,z: z - 115, y: y + 2.5, x: x - 24.5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 240, rotationY: Math.PI / 2,z: z - 90, y: y + 2.5, x: x + 24.5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 110, z: z + 30, y: y + 2.5, x: x - 30}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 240, rotationY: Math.PI / 2,z: z - 90, y: y + 2.5, x: x - 85}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 10, z: z -20, y: y + 2.5, x: x - 30}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 190, rotationY: Math.PI / 2,z: z - 115, y: y + 2.5, x: x - 34.5}, contactMat));
		objectAry.push(new TGWall(world,scene, physMat, {height: 5, depth: 1, width: 51, z: z - 210, y: y + 2.5, x: x - 59.5}, contactMat));
		objectAry.push(new TGCup(world, scene, physMat, {x: x - 60, y: y, z: z-180}, contactMat));

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
import { TGWall } from "./TGWall.js";
import { TGCup } from "./TGCup.js";


export class HoleAssembly {
	constructor(world, scene, physMat, params, contactMat) {
		let x = params.x ?? 0;
		let y = params.y ?? 0;
		let z = params.z ?? 0;
		let objectAry = [];
		
		// front:
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 10, width: 50, y: y, z: z +15, x: x}, contactMat));
		// left
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x + 15, z: z}, contactMat));
		// right
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 20, width: 20, y: y, x: x - 15, z: z}, contactMat));
		// back:
		objectAry.push(new TGWall(world,scene, physMat, {height: 1, depth: 10, width: 50, y: y, z: z -15, x: x}, contactMat));
		// cup
		objectAry.push(new TGCup(world, scene, physMat, {x: x, y: y, z: z}, contactMat));
		
		
		this.objects = objectAry;
	}

	// removes all THREE.js and CANNON.js objects from the scene/world
	remove() {
		this.objects.forEach((object) => {
			object.remove();
		});
	}
}
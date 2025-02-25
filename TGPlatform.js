import * as T from './libs/three.module.js';
//@ts-ignore
import * as CANNON from './libs/cannon-es.js';
import { TGWall } from "./TGWall.js";


// make a box-shaped wall
export class TGPlatform {
	/**
	 * @param {CANNON world} world
	 * @param {THREE scene} scene
	 * @param {CANNON material} wallPhysMat,
	 * @param {Object} params
	 * params.width: wall width
	 * params.height: wall height
	 * params.depth: wall depth
	 * params.x: x position
	 * params.y: y position
	 * params.z: z position
	 * params.rotationX
	 * params.rotationY
	 * params.rotationZ
	 * params.color
	 * params.bodyMat
	 * @param {ContactMaterial} sphereWallMat
	 */
	constructor(world, scene, wallPhysMat, params, contactMat) {
		let width = params.width ?? 50;
		let thickness = params.thickness ?? 1;
		let length = params.length ?? 200;
		let y = params.y ?? 0;
		let x = params.x ?? 0;
		let z = params.z ?? 0;
		let rotationX = params.rotationX ?? 0;
		let rotationZ = params.rotationZ ?? 0;
		let rotationY = params.rotationY ?? 0;
		let wallMat = new T.MeshStandardMaterial({color: params.color ?? "green"});
		let objectsAry = [];
		objectsAry.push(new TGWall(world,scene, wallPhysMat, {height: thickness, depth: length, width: width, x:x, y: y, z: z, color: "green", rotationX: rotationX, rotationZ: rotationZ, rotationY: rotationY}, contactMat));
		objectsAry.push(new TGWall(world,scene, wallPhysMat, {height: 5, depth: 1, width: length, rotationX: rotationX, rotationZ: rotationZ, rotationY: rotationY+ Math.PI / 2,z: z, y: y + 2.5, x: x - ((width/2)-0.5)}, contactMat));
		objectsAry.push(new TGWall(world,scene, wallPhysMat, {height: 5, depth: 1, width: length, rotationX: rotationX, rotationZ: rotationZ,  rotationY: rotationY + Math.PI / 2,z: z, y: y + 2.5, x: x + (width / 2) - .5}, contactMat));
		this.world = world;
		this.scene = scene;

		this.objects = objectsAry;

	}

	// remove the wall mesh and body from the scene/world
	remove() {
		this.objects.forEach((object) => {
			object.remove();
		});
	}
}
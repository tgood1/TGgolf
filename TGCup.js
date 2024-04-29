import * as T from "./libs/three/build/three.module.js";
//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';
import { TGWall } from "./TGWall.js";


// make a wall?
export class TGCup {
	/**
	 * @param {CANNON world} world
	 * @param {THREE scene} scene
	 * @param {CANNON material} cupPhysMat,
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
	 * @param {ContactMaterial} sphereCupMat
	 */
	constructor(world, scene, cupPhysMat, params, sphereCupMat) {
		let radius = 5.5;
		let height = 8;
		// let depth = params.depth ?? 1;
		// let cupMat = new T.MeshStandardMaterial({color: "white", side: T.DoubleSide});

		// let cupGeom = new T.CylinderGeometry(radius, radius, height, 32, 10, true);

		// let cup = new T.Mesh(cupGeom, cupMat);
		// cupGeom.translate(0,-height/2 + 2, 0);

		// scene.add(cup);
		const wallHeight = 8;
		const outerRadius = radius + wallHeight / 2;
		let wallAry = [];
		let cupAry = [];
		const numWalls = 20;
		const yPos = params.y ?? 5;
		const x = params.x ?? 0;
		const z = params.z ?? 0;
		
		// let wall1 = new TGWall(world, scene, cupPhysMat, {z: outerRadius, width: 10, height: wallHeight, color: "orange", rotationX: Math.PI / 2}, sphereCupMat);
		// let wall2 = new TGWall(world, scene, cupPhysMat, {z: -outerRadius, width: 10, height: wallHeight, color: "orange", rotationX: Math.PI / 2}, sphereCupMat);
		const innerRadius = radius - 0.5;
		for (let i = 0; i < numWalls; i++) {
			let  rotZ = (i / numWalls) * 2 * Math.PI;
			let xPos = x + outerRadius  * Math.cos(rotZ);
			let zPos = z + outerRadius * Math.sin(rotZ);
			
			let cupAngle = -rotZ - Math.PI/2;
			let xCup = x + innerRadius * Math.cos(rotZ);
			let zCup = z + innerRadius * Math.sin(rotZ);
			let yCup = yPos - 0.5 - height / 2;
			wallAry.push(new TGWall(world, scene, cupPhysMat, {y: yPos, z: zPos, x: xPos, width: 10, height: wallHeight, color: "green", rotationX: Math.PI / 2, rotationZ: rotZ}, sphereCupMat));
			cupAry.push(new TGWall(world, scene, cupPhysMat, {y: yCup, z: zCup, x: xCup, width: radius * 2 * Math.PI / numWalls, height: height, color: "white", rotationY: cupAngle}, sphereCupMat));
		}
		
		let cupBottom = new TGWall(world, scene, cupPhysMat, {y: yPos - height, z: z, x: x, width: radius * 2, height: radius * 2, color: "white", rotationX: Math.PI / 2}, sphereCupMat);
		
	}
}
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
		let radius = 5;
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
		
		let cupBottom = new TGWall(world, scene, cupPhysMat, {y: yPos - height, z: z, x: x, width: radius * 2, height: radius * 2, color: "white", rotationX: Math.PI / 2}, sphereCupMat)
		
		
		
		// //@ts-ignore
		// let planeGeom = new T.PlaneGeometry(20,20);
		// const planeWidth = 10;
		// const planeHeight = 4;
		// let planeGeom = new T.BufferGeometry();
		// let vertices = new Float32Array([

		// 	planeWidth, planeHeight,  planeWidth, // corner
		// 	0, planeHeight, planeWidth, // corner
		// 	0, planeHeight, radius, // start arc
		// 	radius / 4, planeHeight, Math.sqrt(radius * radius - (radius/4)*(radius / 4)),
		// 	radius / 3, planeHeight, Math.sqrt(radius * radius - (radius/3)*(radius / 3)),
		// 	radius / 2, planeHeight, Math.sqrt(radius * radius - (radius/2)*(radius / 2)),
		// 	radius / Math.sqrt(2), planeHeight, radius / Math.sqrt(2),
		// 	Math.sqrt(radius * radius - (radius/2)*(radius /2)), planeHeight, radius / 2,
		// 	Math.sqrt(radius * radius - (radius/3)*(radius /3)), planeHeight, radius / 3,
		// 	Math.sqrt(radius * radius - (radius/4)*(radius /4)), planeHeight, radius / 4,

		// 	radius,  planeHeight,  0, // end arc
		// 	planeWidth, planeHeight,  0, // corner
	
		// ]);

		// const indices = [
		// 	0, 1, 2,
		// 	0, 2, 3,
		// 	0, 3, 4,
		// 	0, 4,5,
		// 	0, 5, 6,
		// 	0, 6, 7,
		// 	0, 7, 8,
		// 	0, 8,9,
		// 	0, 9, 10,
		// 	0, 10, 11,
		// ];
		// planeGeom.setIndex(indices);
		// planeGeom.setAttribute('position', new T.BufferAttribute(vertices, 3));

		// let planeMat = new T.MeshStandardMaterial({color: "blue", side: T.DoubleSide});


		// let planeBodyVertices = [
		// 	// top
		// 	new CANNON.Vec3(planeWidth, planeHeight,  planeWidth), // corner
		// 	new CANNON.Vec3(0, planeHeight, planeWidth), // corner
		// 	new CANNON.Vec3(0, planeHeight, radius), // start arc
		// 	new CANNON.Vec3(radius / 4, planeHeight, Math.sqrt(radius * radius - (radius/4)*(radius / 4))),
		// 	new CANNON.Vec3(radius / 3, planeHeight, Math.sqrt(radius * radius - (radius/3)*(radius / 3))),
		// 	new CANNON.Vec3(radius / 2, planeHeight, Math.sqrt(radius * radius - (radius/2)*(radius / 2))),
		// 	new CANNON.Vec3(radius / Math.sqrt(2), planeHeight, radius / Math.sqrt(2)),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/2)*(radius /2)), planeHeight, radius / 2),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/3)*(radius /3)), planeHeight, radius / 3),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/4)*(radius /4)), planeHeight, radius / 4),
		// 	new CANNON.Vec3(radius,  planeHeight,  0), // end arc
		// 	new CANNON.Vec3(planeWidth, planeHeight,  0), // corner
		// 	// bottom
		// 	new CANNON.Vec3(planeWidth, planeHeight - 1,  planeWidth),
		// 	new CANNON.Vec3(0, planeHeight - 1, planeWidth),
		// 	new CANNON.Vec3(0, planeHeight - 1, radius),
		// 	new CANNON.Vec3(radius / 4, planeHeight - 1, Math.sqrt(radius * radius - (radius/4)*(radius / 4))),
		// 	new CANNON.Vec3(radius / 3, planeHeight - 1, Math.sqrt(radius * radius - (radius/3)*(radius / 3))),
		// 	new CANNON.Vec3(radius / 2, planeHeight - 1, Math.sqrt(radius * radius - (radius/2)*(radius / 2))),
		// 	new CANNON.Vec3(radius / Math.sqrt(2), planeHeight - 1, radius / Math.sqrt(2)),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/2)*(radius /2)), planeHeight - 1, radius / 2),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/3)*(radius /3)), planeHeight - 1, radius / 3),
		// 	new CANNON.Vec3(Math.sqrt(radius * radius - (radius/4)*(radius /4)), planeHeight - 1, radius / 4),
		// 	new CANNON.Vec3(radius,  planeHeight - 1,  0),
		// 	new CANNON.Vec3(planeWidth, planeHeight - 1,  0)
		// ];

		// let Pfaces = [
		// 	[11,10,9,8,7,6,5,4,3,2,1,0], // top,
		// 	[0, 12, 23, 11],
		// 	[1, 13, 12, 0],
		// 	[2, 14, 13, 1],
		// 	[3, 15, 14, 2],
		// 	// [4, 16, 15, 3],
		// 	// [5, 17, 16, 4],
		// 	// [6, 18, 17, 5],
		// 	// [7, 19, 18, 6],
		// 	// [8, 20, 19, 7],
		// 	// [9, 21, 20, 8],
		// 	// [10, 22, 21, 9],
		// 	// [11, 23, 22, 10],
		// 	// [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

		// ]
		

		// let planeShape = new CANNON.ConvexPolyhedron({vertices: planeBodyVertices, faces: Pfaces});
		// let planeBody = new CANNON.Body({
		// 	mass: 1,
		// 	position: new CANNON.Vec3(0, 5, 0)
		// });
		// console.log(planeShape);
		
		// planeBody.addShape(planeShape);

		// world.addBody(planeBody);

		
		// planeGeom.rotateX(Math.PI/2);
		// planeGeom.translate(0, 2, 0);
		
		// let cupBuff = new T.PlaneBufferGeometry();

	



		
		// cupBuff.fromGeometry(cupGeom);
		// planeGeom.rotateX(Math.PI / 2);

		// scene.add(new T.Mesh(planeGeom, planeMat));

		// let combinedGeom = new T.Geometry().fromBufferGeometry(planeGeom);
		
		// const wallBody = new CANNON.Body({
		// 	shape: new CANNON.Box(new CANNON.Vec3(
		// 		width / 2,
		// 		height / 2,
		// 		depth / 2
		// 	)),
    	// 	type: CANNON.Body.STATIC,
    	// 	material: wallPhysMat,
		// });
		// world.addBody(wallBody);

		// wallBody.position.set(
		// 	params.x ?? 0,
		// 	params.y ?? height / 2,
		// 	params.z ?? 0
		// );
		// wall.quaternion.copy(wallBody.quaternion);
		// wall.position.copy(wallBody.position); 

		// world.addContactMaterial(sphereWallMat);
		
	}
}
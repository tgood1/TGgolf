import * as T from "./libs/three/build/three.module.js";
//@ts-ignore
import * as CANNON from './node_modules/cannon-es/dist/cannon-es.js';


// make a wall?
export class TGWall {
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
	constructor(world, scene, wallPhysMat, params, sphereWallMat) {
		let width = params.width ?? 10;
		let height = params.height ?? 10;
		let depth = params.depth ?? 1;
		let wallMat = new T.MeshStandardMaterial({color: params.color ?? "green"});

		let wallGeom = new T.BoxGeometry(
			width,
			height,
			depth
		);
		// //@ts-ignore
		let wall = new T.Mesh(wallGeom, wallMat);
		scene.add(wall);

		const wallBody = new CANNON.Body({
			shape: new CANNON.Box(new CANNON.Vec3(
				width / 2,
				height / 2,
				depth / 2
			)),
    		type: CANNON.Body.STATIC,
    		material: wallPhysMat,
		});
		world.addBody(wallBody);

		wallBody.position.set(
			params.x ?? 0,
			params.y ?? height / 2,
			params.z ?? 0
		);

		// only do one rotation at a time or it gets weird
		let xRot = params.rotationX ?? 0;
		let yRot = params.rotationY ?? 0;
		let zRot = params.rotationZ ?? 0;
		let wallQuat = new CANNON.Quaternion();
		wallQuat.setFromAxisAngle(new CANNON.Vec3(1,0,0), xRot);
		wallBody.quaternion.mult(wallQuat, wallBody.quaternion);
		wallQuat.setFromAxisAngle(new CANNON.Vec3(0,1,0), yRot);
		wallBody.quaternion.mult(wallQuat, wallBody.quaternion);
		wallQuat.setFromAxisAngle(new CANNON.Vec3(0,0,1), zRot);
		wallBody.quaternion.mult(wallQuat, wallBody.quaternion);
		wall.quaternion.copy(wallBody.quaternion);
		wall.position.copy(wallBody.position); 

		world.addContactMaterial(sphereWallMat);

		this.world = world;
		this.scene = scene;
		this.body = wallBody;
		this.mesh = wall;
	}

	remove() {
		this.scene.remove(this.mesh);
		this.world.removeBody(this.body);
	}
}
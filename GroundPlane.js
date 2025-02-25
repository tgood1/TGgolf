//@ts-check

import * as T from './libs/three.module.js';


export class GroundPlane extends T.Object3D {
	constructor(params = {}){
		super();
		let groundGeom = new T.BoxGeometry(100, 1, 100);
		let groundMat = new T.MeshStandardMaterial({color: "green"});
		// @ts-ignore
		let ground = new T.Mesh(groundGeom, groundMat);
		this.add(ground);
		this.ground = ground;
	}
}
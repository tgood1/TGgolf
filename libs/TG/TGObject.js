//@ts-check

/**
 * Base class to define static objects in TG world :)
 */

import * as T from "../three/build/three.module.js";

/**
 * @param {String} name - name for the object
 * @param {Array<string|Array>} [paramInfo] - list of params
 */
export class TGObject {
	constructor(name, paramInfo) {
		/**	@type {String} */ this.name = name;

		// initialize parameter array
		/**@type {Array<Object>} */ this.params = [];

		if (paramInfo) {
			const thisObj = this;

			
		}

	}
}
import { ASTs } from './lib/types/index.js';

export class Asts {
	private static instance: ASTs;

	private constructor(asts?: ASTs) {
		Asts.instance = asts || {};
	}

	static setInstance(asts: ASTs) {
		Asts.instance = asts;
	}

	static getInstance() {
		if (!Asts.instance) {
			new Asts({});
			return Asts.instance;
		}
		return Asts.instance;
	}
}

export class Cwd {
	private static instance: string;

	private constructor(dir?: string) {
		Cwd.instance = dir || process.cwd();
	}

	static setInstance(dir: string) {
		Cwd.instance = dir;
	}

	static getInstance() {
		if (!Cwd.instance) {
			new Cwd();
			return Cwd.instance;
		}
		return Cwd.instance;
	}
}

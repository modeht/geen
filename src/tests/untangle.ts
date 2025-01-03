import { log } from 'console';
import { A } from './class-a.js';
import { B } from './class-b.js';

const a = new A();
const b = new B();
a.ab = b;
a.bb = b;
b.aa = {} as any;
b.ba = { t: 1 } as any;
// b.ba = a;

// console.dir(a, { depth: null });

//should traverse each level, each object will have its own branch
//each branch should be an object hirearchy visualizing the path
//path should be kept
function untangle(obj: any, keys: any = undefined, path: any = undefined) {
	for (const [key, value] of Object.entries(obj)) {
		let newPath = path ?? {};
		let keysList = keys ?? [];
		if (typeof value === 'object') {
			keysList.push(key);
			//create object representation of the path
			traverse(keysList, newPath);
			return untangle(value, keysList, newPath);
			// console.log(newPath);
		}
	}
	return path;
}

function traverse(path: string[], obj: any) {
	const key = path[0];
	if (obj[key] !== undefined && path.length > 1) {
		traverse(path.slice(1), obj[key]);
	} else {
		obj[key] = {};
	}
}

// const t = {
// 	a: {
// 		b: {
// 			a: { bd: {} },
// 		},
// 	},
// };
// console.dir(traverse(['a', 'b', 'a', 'bd'], t, 'new'), { depth: null });
console.log(untangle(a));
// log(all);

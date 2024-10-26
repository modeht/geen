import { plainToInstance } from 'class-transformer';
import { log } from 'console';
import 'reflect-metadata';

// Define a decorator
function RelationSide(metadata: string) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata('relationSide', metadata, target, propertyKey);
	};
}
class B {
	constructor(field1: number) {
		this.field1 = field1;
	}

	@RelationSide('parent')
	field1: number;
}
class A {
	constructor(field1: number, field2: B) {
		this.field1 = field1;
		this.field2 = field2;
	}

	@RelationSide('parent')
	field1: number;

	@RelationSide('child')
	field2: B;
}

const obj = {
	field1: 1,
	field2: new B(1),
};
const instance = plainToInstance(A, obj);
// log(instance.field2 instanceof B);
const metadata = Reflect.getMetadata('relationSide', instance, Object.keys(instance)[0]);

console.log(metadata); // "some metadata"

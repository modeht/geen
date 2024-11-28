import 'reflect-metadata';

function LogParameter(...args: any[]) {
	console.log(args);
	return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
		const className = target.constructor.name;
		const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
		const paramType = paramTypes[parameterIndex];
		console.log(`Parameter type: ${paramType.name}`);
		console.log(
			`Parameter at index ${parameterIndex} in method ${String(propertyKey)} of class ${className} is being decorated.`,
		);
	};
}
class ExampleService {
	greet(@LogParameter() name: { n: string }, @LogParameter() age: number) {
		return `Hello, ${name}! You are ${age} years old.`;
	}
}

const service = new ExampleService();
service.greet({ n: 'Alice' }, 30);

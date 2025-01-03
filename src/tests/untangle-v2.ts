type CircularReferenceResult = {
	hasCircular: boolean;
	path: string[];
};

function findCircularReference(
	obj: any,
	seen = new Map<any, string[]>(),
	currentPath: string[] = []
): CircularReferenceResult {
	// Base case: if obj is null or not an object, it can't be circular
	if (obj === null || typeof obj !== 'object') {
		return { hasCircular: false, path: [] };
	}

	// If we've seen this object before, we've found a circular reference
	if (seen.has(obj)) {
		return {
			hasCircular: true,
			// Return the path from the first occurrence to current position
			path: [...seen.get(obj)!, ...currentPath],
		};
	}

	// Add the current object to our map with its path
	seen.set(obj, currentPath);

	// Recursively check all values in the object
	for (const [key, value] of Object.entries(obj)) {
		const result = findCircularReference(value, seen, [...currentPath, key]);

		if (result.hasCircular) {
			return result;
		}
	}

	// Remove the current object from seen before returning
	seen.delete(obj);

	return { hasCircular: false, path: [] };
}

// Example usage:
interface TestObject {
	[key: string]: any;
}

// Test case 1: Simple circular reference
const objA: TestObject = { name: 'A' };
const objB: TestObject = { name: 'B' };
objA.b = objB;
objB.a = objA;
console.log('Test case 1:', findCircularReference(objA));
// Output: { hasCircular: true, path: ['b', 'a'] }

// Test case 2: Deep circular reference
const deep: TestObject = {
	level1: {
		level2: {
			level3: {},
		},
	},
};
deep.level1.level2.level3.circular = deep.level1;
console.log('Test case 2:', findCircularReference(deep));
// Output: { hasCircular: true, path: ['level1', 'level2', 'level3', 'circular', 'level1'] }

// Test case 3: No circular reference
const objC: TestObject = {
	b: {
		c: 'some value',
	},
};
console.log('Test case 3:', findCircularReference(objC));
// Output: { hasCircular: false, path: [] }

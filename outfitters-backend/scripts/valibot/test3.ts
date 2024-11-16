let count = 0;

for (let i = 0; i < 1000; i++) {
	for (let j = 0; j < 1000; j++) {
		for (let k = 0; k < 1000; k++) {
			count++;
			if (count === 1_000_000_000) {
				console.log('Reached 1 billion iterations');
				break;
			}
		}
		if (count === 1_000_000_000) break;
	}
	if (count === 1_000_000_000) break;
}

console.log('Final Count: ', count);

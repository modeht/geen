import { exec } from 'child_process';
import { join } from 'path';

/**
 * initialize a project
 * create modules with entities
 * run geen
 * run project healthcheck
 * if success all good, else, show errors
 */
export const clearGenerated = () => {
	return new Promise((resolve, reject) => {
		const prc = exec(`tsx ${join(process.cwd(), 'src/clear-generated.ts')}`, (error, stdout, stderr) => {
			console.log('stdout: ', stdout);
			console.log('stderr: ', stderr);

			if (error) {
				console.error('clear-generated error', error);
				reject(error);
			}

			prc.kill();
			resolve(true);
		});

		prc.on('exit', (code, signal) => {
			console.log(`child process exited with code ${code} and signal ${signal}`);
		});
	});
};

export const runEngine = () => {
	return new Promise((resolve, reject) => {
		const prc = exec(`tsx ${join(process.cwd(), 'src/main.ts')} -d ./nest-template`, (error, stdout, stderr) => {
			console.log('stdout: ', stdout);
			console.log('stderr: ', stderr);

			if (error) {
				console.error('engine error', error);
				reject(error);
			}

			prc.kill();
			resolve(true);
		});

		prc.on('exit', (code, signal) => {
			console.log(`child process exited with code ${code} and signal ${signal}`);
		});
	});
};

import fastify from 'fastify';
import cluster from 'node:cluster';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { clearGenerated, runEngine } from './lib';
import { OpenAI } from 'openai';
import { SchemaBuilderAssistant } from './ai-schema-assistant';

if (cluster.isPrimary) {
	const numCPUs = 1; //cpus().length;
	console.log(`Primary ${process.pid} is running`);
	console.log(`Starting ${numCPUs} workers...`);

	// Fork workers
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	// Handle worker events
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died. Signal: ${signal}. Code: ${code}`);
		console.log('Starting a new worker...');
		cluster.fork();
	});

	cluster.on('online', (worker) => {
		console.log(`Worker ${worker.process.pid} is online`);
	});
} else {
	const server = fastify({
		logger: {
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
			},
		},
	});
	const openai = new OpenAI({
		apiKey: '',
	});

	server.register(import('@fastify/cors'), {
		origin: '*',
	});

	server.get('/', async (request, reply) => {
		// runEngine();
		return true;
	});

	server.post('/api/ai', async (request, reply) => {
		const body = request.body as {
			prompt: string;
		};

		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'assistant', content: SchemaBuilderAssistant },
				{ role: 'user', content: body.prompt },
			],
		});
		console.dir(response.choices, { depth: null });
		reply.send({ success: true, message: response.choices.at(-1)?.message.content });
	});

	server.post('/api/geen', async (request, reply) => {
		const body = request.body as Array<{
			entityName: string;
			moduleName: string;
			content: string;
		}>;

		await clearGenerated();

		const prs: any[] = [];
		for (const entity of body) {
			const dirpath = `nest-template/src/${entity.moduleName}-feature/entities`;
			const make = mkdir(dirpath, { recursive: true }).then(() => {
				writeFile(`${dirpath}/${entity.moduleName}.entity.ts`, entity.content);
			});
			prs.push(make);
		}
		Promise.all(prs).then(() => runEngine());

		reply.send({ success: true, message: 'in progress' });
	});

	const start = async () => {
		try {
			await server.listen({
				port: 3000,
				host: '0.0.0.0',
			});
			console.log(`Worker ${process.pid} started`);
		} catch (err) {
			server.log.error(err);
			process.exit(1);
		}
	};

	start();
}

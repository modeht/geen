import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Cwd } from './Cwd.js';
import ts from 'typescript';
import { exec } from 'child_process';
import chalk from 'chalk';

export async function prereq() {
	await Promise.all([
		verifyPackageJson(),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'constants'), { recursive: true }),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'lib'), { recursive: true }),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'schemas'), { recursive: true }),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'services'), { recursive: true }),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'decorators'), { recursive: true }),
		mkdir(join(Cwd.getInstance(), 'src', 'geen', 'openapi'), { recursive: true }),
	]);

	await Promise.all([
		verifyAppModule(),
		writeFile(
			join(Cwd.getInstance(), 'src', 'schema-defs.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/openapi', 'schema-defs.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/openapi/parse-schemas.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/openapi', 'parse-schemas.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/openapi/generate-openapi-components.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/openapi', 'generate-openapi-components.template'), 'utf8')
		),
	]);

	await Promise.all([
		verifyAppModuleImports(),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/geen-global.module.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/global.module.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/services/abstract-service.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/services', 'abstract-service.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/constants/pg-error-codes.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/constants', 'pg-error-codes.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/constants/schema-symbols.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/constants', 'schema-symbols.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/lib/comparable.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/lib', 'comparable.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/lib/create-relations.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/lib', 'create-relations.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/lib/create-where.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/lib', 'create-where.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/schemas/order.schema.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/schemas', 'order.schema.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/schemas/pagination.schema.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/schemas', 'pagination.schema.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/decorators/mo-body.decorator.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/decorators', 'mo-body.decorator.template'), 'utf8')
		),
		writeFile(
			join(Cwd.getInstance(), 'src', 'geen/decorators/mo-query.decorator.ts'),
			await readFile(join(process.cwd(), 'src/prerequisites/decorators', 'mo-query.decorator.template'), 'utf8')
		),
	]);
	console.log('prereq done');
}

async function verifyPackageJson() {
	const packageJsonPath = join(Cwd.getInstance(), 'package.json');
	const packageJson = await readFile(packageJsonPath, 'utf8');
	const packageJsonObj = JSON.parse(packageJson);
	let installPackages = false;
	//required packages
	if (!packageJsonObj.dependencies['valibot']) {
		packageJsonObj.dependencies['valibot'] = '1.0.0-beta.10';
		installPackages = true;
	}

	if (!packageJsonObj.dependencies['@nestjs/swagger']) {
		packageJsonObj.dependencies['@nestjs/swagger'] = '^7.4.0';
		installPackages = true;
	}

	if (!packageJsonObj.dependencies['qs']) {
		packageJsonObj.dependencies['qs'] = '^6.13.0';
		installPackages = true;
	}

	if (!packageJsonObj.scripts['@valibot/to-json-schema']) {
		packageJsonObj.dependencies['@valibot/to-json-schema'] = '1.0.0-beta.2';
		installPackages = true;
	}

	if (!packageJsonObj.scripts['@openapi-contrib/json-schema-to-openapi-schema']) {
		packageJsonObj.dependencies['@openapi-contrib/json-schema-to-openapi-schema'] = '^3.0.3';
		installPackages = true;
	}

	await writeFile(packageJsonPath, JSON.stringify(packageJsonObj, null, 2));

	if (installPackages) {
		chalk.yellow('You need to run pnpm install to install the required packages');
	}
}

function findNodes<T extends ts.Node>(node: ts.Node, predicate: (node: ts.Node) => node is T): T[] {
	const results: T[] = [];

	function visit(node: ts.Node) {
		if (predicate(node)) {
			results.push(node);
		}
		ts.forEachChild(node, visit);
	}

	visit(node);
	return results;
}

async function verifyAppModule() {
	const appModulePath = join(Cwd.getInstance(), 'src', 'app.module.ts');
	const sourceFile = ts.createSourceFile(
		appModulePath,
		await readFile(appModulePath, 'utf8'),
		ts.ScriptTarget.Latest,
		true
	);

	const geenModules = findNodes(sourceFile, (node): node is ts.ImportDeclaration => {
		if (!ts.isImportDeclaration(node)) return false;
		return node.moduleSpecifier.getText().includes('geen-modules');
	});

	const geenGlobalModule = findNodes(sourceFile, (node): node is ts.ImportDeclaration => {
		if (!ts.isImportDeclaration(node)) return false;
		return node.moduleSpecifier.getText().includes('geen-global.module');
	});

	let imports: any = [];
	if (geenModules.length === 0) {
		// Create new import declaration
		const importStmt = ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamedImports([
					ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier('geenModules')),
				])
			),
			ts.factory.createStringLiteral('./geen-modules')
		);
		imports.push(importStmt);
	}
	if (geenGlobalModule.length === 0) {
		const importStmt = ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamedImports([
					ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier('GeenGlobalModule')),
				])
			),
			ts.factory.createStringLiteral('./geen/geen-global.module')
		);
		imports.push(importStmt);
	}
	const newSourceFile = ts.factory.updateSourceFile(sourceFile, [...imports, ...sourceFile.statements]);
	await Promise.all([writeFile(appModulePath, ts.createPrinter().printFile(newSourceFile))]);

	//reset geen-modules.ts
	await writeFile(join(dirname(appModulePath), 'geen-modules.ts'), geenModulesTemplate);
}

async function verifyAppModuleImports() {
	const appModulePath = join(Cwd.getInstance(), 'src', 'app.module.ts');
	const sourceFile = ts.createSourceFile(
		appModulePath,
		await readFile(appModulePath, 'utf8'),
		ts.ScriptTarget.Latest,
		true
	);

	const moduleDecorator = findNodes(sourceFile, (node): node is ts.Decorator => {
		if (!ts.isDecorator(node)) return false;
		const call = node.expression as ts.CallExpression;
		return ts.isCallExpression(call) && call.expression.getText() === 'Module';
	})[0];

	if (moduleDecorator) {
		const moduleArgs = (moduleDecorator.expression as ts.CallExpression).arguments[0] as ts.ObjectLiteralExpression;
		const importsProperty = moduleArgs.properties.find(
			(prop) => ts.isPropertyAssignment(prop) && prop.name.getText() === 'imports'
		) as ts.PropertyAssignment;

		if (importsProperty) {
			const importsArray = importsProperty.initializer as ts.ArrayLiteralExpression;
			const hasGeenModules = importsArray.elements.some((element) => element.getText() === '...geenModules');
			const hasGeenGlobalModule = importsArray.elements.some((element) => element.getText() === 'GeenGlobalModule');

			if (!hasGeenModules || !hasGeenGlobalModule) {
				const newImports = [...importsArray.elements];
				if (!hasGeenModules) newImports.push(ts.factory.createIdentifier('...geenModules'));
				if (!hasGeenGlobalModule) newImports.push(ts.factory.createIdentifier('GeenGlobalModule'));

				const newImportsArray = ts.factory.updateArrayLiteralExpression(importsArray, newImports);

				const newImportsProperty = ts.factory.updatePropertyAssignment(
					importsProperty,
					importsProperty.name,
					newImportsArray
				);

				const newModuleArgs = ts.factory.updateObjectLiteralExpression(
					moduleArgs,
					moduleArgs.properties.map((prop) => (prop === importsProperty ? newImportsProperty : prop))
				);

				const newDecorator = ts.factory.updateDecorator(
					moduleDecorator,
					ts.factory.updateCallExpression(
						moduleDecorator.expression as ts.CallExpression,
						(moduleDecorator.expression as ts.CallExpression).expression,
						(moduleDecorator.expression as ts.CallExpression).typeArguments,
						[newModuleArgs]
					)
				);

				const newSourceFile = ts.factory.updateSourceFile(
					sourceFile,
					sourceFile.statements.map((stmt) => {
						if (ts.isClassDeclaration(stmt)) {
							const decorators = ts.getDecorators(stmt) || [];
							if (decorators.includes(moduleDecorator)) {
								return ts.factory.updateClassDeclaration(
									stmt,
									[newDecorator, ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
									stmt.name,
									stmt.typeParameters,
									stmt.heritageClauses,
									stmt.members
								);
							}
						}
						return stmt;
					})
				);

				await writeFile(appModulePath, ts.createPrinter().printFile(newSourceFile));
			}
		}
	}
}

const geenModulesTemplate = `//auto generated, don't modify
//imports

export const geenModules = [
  //auto generated, don't modify
  //modules
]
`;

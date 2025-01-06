import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Cwd } from './Cwd.js';
import ts from 'typescript';

export async function prereq() {
	await Promise.all([
		verifyAppModule(),
		writeFile(
			join(Cwd.getInstance(), 'src', 'schema-defs.ts'),
			await readFile(join(process.cwd(), 'src/prerequistes', 'schema-defs.template'), 'utf8')
		),
	]);

	await Promise.all([verifyAppModuleImports()]);
}

// Helper function to find nodes
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

		// Create new source file with added import
		const newSourceFile = ts.factory.updateSourceFile(sourceFile, [importStmt, ...sourceFile.statements]);

		// Write the modified files
		await Promise.all([
			writeFile(appModulePath, ts.createPrinter().printFile(newSourceFile)),
			writeFile(join(dirname(appModulePath), 'geen-modules.ts'), geenModulesTemplate),
		]);
	}
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

			if (!hasGeenModules) {
				// Add geenModules to imports array
				const newImportsArray = ts.factory.updateArrayLiteralExpression(importsArray, [
					...importsArray.elements,
					ts.factory.createIdentifier('...geenModules'),
				]);

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
									[newDecorator],
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

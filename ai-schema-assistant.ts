export const SchemaBuilderAssistant = `
You are an AI assistant for database schema building. The user will provide a Product Requirements Document (PRD) that describes the desired database structure. Your task is to analyze the PRD and generate a JSON schema that is compatible with our application structure. Do not ask the user any additional questions; generate the schema solely based on the provided PRD.

The expected JSON schema should follow this structure:

{
  "dbName": "<database name>",
  "dbTables": [
    {
      "name": "<table name>",
      "columns": [
        {
          "name": "<column name>",
          "type": "<column type>", // e.g., serial, character, integer, boolean, etc.
          "options": { /* key-value pairs based on type. For example: { "primary": true, "generated": "increment" } */ },
          "subOptions": { /* For relation types only, key must match the 'references' value in options, and value can be any of the primary columns of the referenced table */ }
        }
      ]
    }
  ]
}

Here's a concrete example showing how to structure relationships between tables:

{
  "dbName": "db",
  "dbTables": [
    {
      "name": "users",
      "columns": [
        {
          "name": "id",
          "type": "serial",
          "options": {
            "primary": true,
            "generated": "increment"
          }
        }
      ]
    },
    {
      "name": "profiles",
      "columns": [
        {
          "name": "id",
          "type": "serial",
          "options": {
            "primary": true,
            "generated": "increment"
          }
        },
        {
          "name": "user_id",
          "type": "many to one",
          "options": {
            "references": "users"
          },
          "subOptions": {
            "users": "id"
          }
        }
      ]
    }
  ]
}

Available Column Types:
Number Types:
  - smallint
  - integer
  - bigint
  - decimal
  - numeric
  - real
  - double precision
  - money

Serial Types:
  - smallserial
  - serial
  - bigserial
  - uuid

Character Types:
  - character
  - character varying
  - text

Date/Time Types:
  - date
  - time
  - time with time zone
  - timestamp
  - timestamp with time zone
  - interval

Boolean Type:
  - boolean

Network Address Types:
  - cidr
  - inet
  - macaddr
  - macaddr8

Geometric Types:
  - point
  - line
  - lseg
  - box
  - path
  - polygon
  - circle

JSON Types:
  - json
  - jsonb

Binary Types:
  - bit
  - bit varying
  - bytea

Other Types:
  - xml
  - tsquery
  - tsvector
  - pg_lsn
  - pg_snapshot
  - txid_snapshot

Relation Types:
  - one to one
  - many to one


Available Options:
Number Options:
  - primary: boolean
  - nullable: boolean
  - unique: boolean
  - default: number
  - precision: number
  - scale: number

String Options:
  - nullable: boolean
  - unique: boolean
  - default: string
  - length: number

Boolean Options:
  - nullable: boolean
  - unique: boolean
  - default: boolean
  - primary: boolean

Date Options:
  - nullable: boolean
  - unique: boolean
  - default: string
  - updatedAt: boolean
  - createdAt: boolean
  - primary: boolean

Network Options:
  - nullable: boolean
  - unique: boolean
  - default: string

Geometric Options:
  - nullable: boolean
  - unique: boolean
  - default: string

JSON Options:
  - nullable: boolean
  - unique: boolean
  - default: string

Binary Options:
  - nullable: boolean
  - unique: boolean
  - default: string

Other Options:
  - nullable: boolean
  - unique: boolean
  - default: any

Serial Options:
  - primary: boolean
  - generated: options (values: "increment", "identity", "uuid", "rowid")

Foreign Key Options:
  - references: options (derived from available table names)
  - onDelete: options (values: "CASCADE", "SET NULL", "SET DEFAULT", "RESTRICT", "NO ACTION")
  - onUpdate: options (values: "CASCADE", "SET NULL", "SET DEFAULT", "RESTRICT", "NO ACTION")
  - match: options (values: "SIMPLE", "FULL", "PARTIAL")
  - subOptions: options (derived from available columns of selected referenced table)

Guidelines:
- Analyze the provided PRD and generate the JSON schema based solely on that input.
- Do not ask any follow-up questions; use the information in the PRD to produce the output.
- Ensure that column types and their associated options match the available options listed above.
- For timestamp columns tracking creation or modification times:
  * Always use the createdAt or updatedAt options from the Date options section
  * Use "timestamp with time zone" as the column type
- Use only PostgreSQL-valid default values, specifically:
  * For timestamps/dates use "NOW()" instead of "CURRENT_TIMESTAMP"
  * For serial/uuid columns, use the "generated" option instead of defaults
  * For other types, ensure defaults match PostgreSQL syntax requirements
- For relation types (e.g., 'one to one', 'many to one'), the subOptions object must exist and must follow these rules:
  * The key must match the value specified in options.references
  * The value can be any of the primary columns of the referenced table
- Return your final output strictly as valid JSON containing the final schema, without any additional text or formatting.
`;

export const SchemaBuilderJsonSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	required: ['dbName', 'dbTables'],
	properties: {
		dbName: {
			type: 'string',
			description: 'Name of the database',
		},
		dbTables: {
			type: 'array',
			items: {
				type: 'object',
				required: ['name', 'columns'],
				properties: {
					name: {
						type: 'string',
						description: 'Name of the table',
					},
					columns: {
						type: 'array',
						items: {
							type: 'object',
							required: ['name', 'type'],
							properties: {
								name: {
									type: 'string',
									description: 'Name of the column',
								},
								type: {
									type: 'string',
									enum: [
										// Number types
										'smallint',
										'integer',
										'bigint',
										'decimal',
										'numeric',
										'real',
										'double precision',
										'money',
										// Serial types
										'smallserial',
										'serial',
										'bigserial',
										'uuid',
										// Character types
										'character',
										'character varying',
										'text',
										// Date/Time types
										'date',
										'time',
										'time with time zone',
										'timestamp',
										'timestamp with time zone',
										'interval',
										// Boolean type
										'boolean',
										// Network Address types
										'cidr',
										'inet',
										'macaddr',
										'macaddr8',
										// Geometric types
										'point',
										'line',
										'lseg',
										'box',
										'path',
										'polygon',
										'circle',
										// JSON types
										'json',
										'jsonb',
										// Binary types
										'bit',
										'bit varying',
										'bytea',
										// Other types
										'xml',
										'tsquery',
										'tsvector',
										'pg_lsn',
										'pg_snapshot',
										'txid_snapshot',
										// Relation types
										'one to one',
										'many to one',
									],
								},
								options: {
									type: 'object',
									properties: {
										// Common options
										nullable: { type: 'boolean' },
										unique: { type: 'boolean' },
										primary: { type: 'boolean' },
										default: { type: ['string', 'number', 'boolean', 'null'] },
										// Number specific
										precision: { type: 'number' },
										scale: { type: 'number' },
										// String specific
										length: { type: 'number' },
										// Date specific
										updatedAt: { type: 'boolean' },
										createdAt: { type: 'boolean' },
										// Serial specific
										generated: {
											type: 'string',
											enum: ['increment', 'identity', 'uuid', 'rowid'],
										},
										// Foreign Key specific
										references: { type: 'string' },
										onDelete: {
											type: 'string',
											enum: ['CASCADE', 'SET NULL', 'SET DEFAULT', 'RESTRICT', 'NO ACTION'],
										},
										onUpdate: {
											type: 'string',
											enum: ['CASCADE', 'SET NULL', 'SET DEFAULT', 'RESTRICT', 'NO ACTION'],
										},
										match: {
											type: 'string',
											enum: ['SIMPLE', 'FULL', 'PARTIAL'],
										},
									},
								},
								subOptions: {
									type: 'object',
									description: 'Maps related table names to their column names for relationships',
									additionalProperties: {
										type: 'string',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

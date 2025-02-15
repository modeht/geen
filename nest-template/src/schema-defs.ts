
interface ISchemaDefs {
  [key: string]: string;
		CreateUsers: string;
	ReadUsersFilters: string;
	ReadUsersOrders: string;
	ReadUsersQuery: string;
	ReadUsersRelations: string;
	UpdateUsers: string;
}

export const SchemaDefs: ISchemaDefs = {
			CreateUsers: '#/components/schemas/CreateUsers',
	ReadUsersFilters: '#/components/schemas/ReadUsersFilters',
	ReadUsersOrders: '#/components/schemas/ReadUsersOrders',
	ReadUsersQuery: '#/components/schemas/ReadUsersQuery',
	ReadUsersRelations: '#/components/schemas/ReadUsersRelations',
	UpdateUsers: '#/components/schemas/UpdateUsers',
}
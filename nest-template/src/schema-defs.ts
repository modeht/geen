
interface ISchemaDefs {
  [key: string]: string;
		CreateProfiles: string;
	ReadProfilesFilters: string;
	ReadProfilesOrders: string;
	ReadProfilesQuery: string;
	ReadProfilesRelations: string;
	UpdateProfiles: string;
	CreateUsers: string;
	ReadUsersFilters: string;
	ReadUsersOrders: string;
	ReadUsersQuery: string;
	ReadUsersRelations: string;
	UpdateUsers: string;
}

export const SchemaDefs: ISchemaDefs = {
			CreateProfiles: '#/components/schemas/CreateProfiles',
	ReadProfilesFilters: '#/components/schemas/ReadProfilesFilters',
	ReadProfilesOrders: '#/components/schemas/ReadProfilesOrders',
	ReadProfilesQuery: '#/components/schemas/ReadProfilesQuery',
	ReadProfilesRelations: '#/components/schemas/ReadProfilesRelations',
	UpdateProfiles: '#/components/schemas/UpdateProfiles',
	CreateUsers: '#/components/schemas/CreateUsers',
	ReadUsersFilters: '#/components/schemas/ReadUsersFilters',
	ReadUsersOrders: '#/components/schemas/ReadUsersOrders',
	ReadUsersQuery: '#/components/schemas/ReadUsersQuery',
	ReadUsersRelations: '#/components/schemas/ReadUsersRelations',
	UpdateUsers: '#/components/schemas/UpdateUsers',
}
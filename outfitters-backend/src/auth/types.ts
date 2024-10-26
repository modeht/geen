export enum Role {
	Shopper = 'shopper',
	Brand = 'brand',
	Outfitter = 'outfitter',
	Admin = 'admin',
}

export type SessionToken = {
	sub: number;
	phone: string;
	firebaseId: string;
	role: Role;
};

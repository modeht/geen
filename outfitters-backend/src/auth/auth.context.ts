import { Global, Injectable, Module, Scope } from '@nestjs/common';
import { Role, SessionToken } from './types';

@Injectable({
	scope: Scope.REQUEST,
})
export class AuthContext {
	private sub: number;
	private username: string;
	private phone: string;
	private firebaseId: string;
	private role: Role;

	constructor() {}

	getUser(): SessionToken | null {
		if (!this.sub) return null;
		return {
			role: this.role,
			sub: this.sub,
			phone: this.phone,
			firebaseId: this.firebaseId,
		};
	}

	setUser(user: SessionToken) {
		this.sub = user.sub;
		this.role = user.role;
		this.firebaseId = user.firebaseId;
		this.phone = user.phone;
	}
}

@Global()
@Module({
	providers: [AuthContext],
	exports: [AuthContext],
})
export class AuthContextModule {}

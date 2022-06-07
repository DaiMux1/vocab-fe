export enum UserStatus {
	active = 1,
	inactive = 0,
	ban = 2
}

export enum UserRole {
	user,
	manager,
	super_admin
}

export type UserDB = {
	id: number;
	username: string;
	password: string;
	status?: UserStatus;
	role?: UserRole;
};

export type UserLogin = Pick<UserDB, 'username' | 'password'>;

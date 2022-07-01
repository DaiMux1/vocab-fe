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

export type CurrentUser = {
	iat: number;
	id: string;
	role: number;
	status: number;
	username: string;
};

export type Author = {
	username: string;
	status: number;
	role: number;
};

export type UserLogin = Pick<UserDB, 'username' | 'password'>;

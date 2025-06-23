declare interface CreateUserParams {
	clerkId: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	picture: string;
}

declare interface GetUsersParams {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}

declare interface GetProgramsParams {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}

declare interface GetProgramDetailsParams {
	programId: string;
	userId: string;
}

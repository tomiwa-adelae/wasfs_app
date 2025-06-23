"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

export const getUsers = async ({
	query,
	limit = 0,
	page,
	userId,
}: GetUsersParams) => {
	try {
		await connectToDatabase();

		// Safely parse page and limit
		const parsedPage = Number(page);
		const validPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

		const validLimit = typeof limit === "number" && limit > 0 ? limit : 0;

		const skipAmount = validLimit > 0 ? (validPage - 1) * validLimit : 0;

		const keyword = query
			? {
					$or: [
						{ email: { $regex: query, $options: "i" } },
						{ firstName: { $regex: query, $options: "i" } },
						{ lastName: { $regex: query, $options: "i" } },
						{ phoneNumber: { $regex: query, $options: "i" } },
						{ bio: { $regex: query, $options: "i" } },
						{ address: { $regex: query, $options: "i" } },
						{ state: { $regex: query, $options: "i" } },
						{ userId: { $regex: query, $options: "i" } },
						{ city: { $regex: query, $options: "i" } },
						{ country: { $regex: query, $options: "i" } },
						{ occupation: { $regex: query, $options: "i" } },
						{ status: { $regex: query, $options: "i" } },
						{ company: { $regex: query, $options: "i" } },
					],
			  }
			: {};

		if (!userId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findById(userId);

		if (!user || !user?.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const users = await User.find({ _id: { $ne: userId }, ...keyword })
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount)
			.limit(limit);

		const usersCount = await User.countDocuments({ ...keyword });

		return {
			status: 200,
			message: "Success",
			users: JSON.parse(JSON.stringify(users)),
			totalPages: Math.ceil(usersCount / limit),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

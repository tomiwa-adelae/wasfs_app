"use server";

import { connectToDatabase } from "@/lib/database";
import Program from "@/lib/database/models/program.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

// Get all the programs
export const getPrograms = async ({
	userId,
	page,
	query,
	limit = 0,
}: GetProgramsParams) => {
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
						{ user: { $regex: query, $options: "i" } },
						{ programId: { $regex: query, $options: "i" } },
						{ title: { $regex: query, $options: "i" } },
						{ description: { $regex: query, $options: "i" } },
						{ thumbnail: { $regex: query, $options: "i" } },
						{ thumbnailId: { $regex: query, $options: "i" } },
						{ price: { $regex: query, $options: "i" } },
						{ estimatedDuration: { $regex: query, $options: "i" } },
						{ status: { $regex: query, $options: "i" } },
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

		const programs = await Program.find({ ...keyword })
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit)
			.populate("category");

		const programsCount = await Program.countDocuments({ ...keyword });

		return {
			status: 200,
			message: "Success",
			programs: JSON.parse(JSON.stringify(programs)),
			totalPages: Math.ceil(programsCount / limit),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Get program details
export const getProgramDetails = async ({
	programId,
	userId,
}: GetProgramDetailsParams) => {
	try {
		await connectToDatabase();

		if (!programId || !userId)
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

		const program = await Program.findById(programId).populate("user");

		if (!program)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		return {
			status: 201,
			message: "Successful",
			program: JSON.parse(JSON.stringify(program)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

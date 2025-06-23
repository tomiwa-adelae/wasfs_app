"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import Mailjet from "node-mailjet";
import "../../database/models";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a user account with Clerk
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		if (!user.email || !user.firstName || !user.lastName)
			return {
				status: 400,
				message: "Please fill all fields!",
			};

		function generateSuffix(length = 4): string {
			const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			let result = "";
			for (let i = 0; i < length; i++) {
				result += chars.charAt(
					Math.floor(Math.random() * chars.length)
				);
			}
			return result;
		}

		const year = new Date().getFullYear();
		let suffix = generateSuffix();
		let userId = `WS-${year}-${suffix}`;

		// Ensure uniqueness
		let existing = await User.findOne({ userId });
		while (existing) {
			suffix = generateSuffix();
			userId = `WS-${year}-${suffix}`;
			existing = await User.findOne({ userId });
		}

		const details = {
			...user,
			userId,
		};

		const newUser = await User.create(details);

		if (!newUser)
			return {
				status: 400,
				message:
					"Your account was not successfully created. Try again later",
			};

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

// Get user details from DB
export const getUserInfo = async (clerkId: string) => {
	try {
		await connectToDatabase();

		if (!clerkId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findOne({ clerkId });

		if (!user)
			return {
				status: 400,
				message: "Oops! Your account was not found. Try again later",
			};

		return {
			status: 200,
			message: "Success",
			user: JSON.parse(JSON.stringify(user)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

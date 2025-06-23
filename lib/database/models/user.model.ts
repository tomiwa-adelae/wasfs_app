import { Document, Schema, model, models, Types } from "mongoose";

export interface IEnrolledProgram {
	courseId: Types.ObjectId; // Reference to Program model
	enrolledAt: Date;
	progress: number; // percentage completed
	completed: boolean;
	certificateIssued: boolean;
}

// Define the TypeScript interface for the User document
export interface IUser extends Document {
	clerkId: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	picture?: string;
	pictureId?: string;
	bio?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	occupation?: string;
	userId?: string;
	company?: string;
	status?: string;
	createdAt?: Date;
	updatedAt?: Date;
	isAdmin?: boolean;
	enrolledPrograms: IEnrolledProgram[];
}

// Define Mongoose Schema with Type Safety
const UserSchema = new Schema<IUser>(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
		},
		picture: {
			type: String,
		},
		pictureId: {
			type: String,
		},
		bio: {
			type: String,
		},
		address: {
			type: String,
		},
		state: {
			type: String,
		},
		userId: {
			type: String,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
			default: "nigeria",
		},
		occupation: {
			type: String,
		},
		status: {
			type: String,
			default: "active",
		},
		company: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		enrolledPrograms: [
			{
				courseId: {
					type: Schema.Types.ObjectId,
					ref: "Program",
				},
				enrolledAt: {
					type: Date,
					default: Date.now,
				},
				progress: {
					type: Number,
					default: 0, // percentage completed
				},
				completed: {
					type: Boolean,
					default: false,
				},
				certificateIssued: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Create and export the User model with Type Safety
const User = models.User || model<IUser>("User", UserSchema);

export default User;

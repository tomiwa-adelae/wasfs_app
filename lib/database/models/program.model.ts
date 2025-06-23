import { Document, Schema, model, models, Types } from "mongoose";

export interface IProgram extends Document {
	user: Types.ObjectId; // Reference to User model
	programId?: string;
	title: string;
	description?: string;
	thumbnail?: string;
	thumbnailId?: string;
	price?: string;
	isPublished?: boolean;
	totalEnrolled?: number;
	certificateAvailable?: boolean;
	estimatedDuration?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// Define Mongoose Schema with Type Safety
const ProgramSchema = new Schema<IProgram>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		programId: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
		thumbnailId: {
			type: String,
		},
		price: {
			type: String,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		totalEnrolled: {
			type: Number,
			default: 0,
		},
		certificateAvailable: {
			type: Boolean,
			default: true,
		},
		estimatedDuration: {
			type: String, // e.g., "4 weeks", "6 hours"
		},
	},
	{ timestamps: true } // Enables createdAt and updatedAt
);

// Create and export the program model with Type Safety
const Program = models.Program || model<IProgram>("Program", ProgramSchema);

export default Program;

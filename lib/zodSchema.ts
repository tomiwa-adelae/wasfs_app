import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
	"Development",
	"Business",
	"Finance",
	"IT & Software",
	"Office productivity",
	"Personal Development",
	"Design",
	"Marketing",
	"Health & Fitness",
	"Musics",
	"Teaching & Academics",
] as const;

export const courseSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must be at least 3 characters" })
		.max(100, { message: "Title must be at most 100 characters" }),
	description: z
		.string()
		.min(3, { message: "Description must be at least 3 characters" }),
	fileKey: z
		.string()
		.min(3, { message: "File key must be at least 3 characters" }),
	price: z.coerce
		.number()
		.min(1, { message: "Price must be a positive number" }),
	duration: z.coerce
		.number()
		.min(1, { message: "Duration must be at least 1 hour" })
		.max(500, { message: "Duration must be at most 500 hours" }),
	level: z.enum(courseLevels, { message: "Level is required" }),
	category: z.enum(courseCategories, { message: "Category is required" }),
	smallDescription: z
		.string()
		.min(3, { message: "Description must be at least 3 characters" })
		.max(200, { message: "Description must be at least 3 characters" }),
	slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
	status: z.enum(courseStatus, { message: "Status is required" }),
});

export const chapterSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" }),
	courseId: z.string().uuid({ message: "Invalid course ID" }),
});

export const lessonSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" }),
	courseId: z.string().uuid({ message: "Invalid course ID" }),
	chapterId: z.string().uuid({ message: "Invalid chapter ID" }),
	description: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" })
		.optional(),
	thumbnailKey: z.string().optional(),
	videoKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;

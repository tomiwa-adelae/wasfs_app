import "server-only";
import { prisma } from "@/lib/db";

export const getAllCourses = async () => {
	const data = await prisma.course.findMany({
		where: {
			status: "Published",
		},
		orderBy: {
			createdAt: "desc",
		},
		select: {
			title: true,
			smallDescription: true,
			price: true,
			slug: true,
			fileKey: true,
			id: true,
			level: true,
			duration: true,
			category: true,
		},
	});

	return data;
};

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];

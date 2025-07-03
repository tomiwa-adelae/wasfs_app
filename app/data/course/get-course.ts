import "server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getIndividualCourse(slug: string) {
	const course = await prisma.course.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			title: true,
			smallDescription: true,
			description: true,
			category: true,
			level: true,
			status: true,
			price: true,
			fileKey: true,
			slug: true,
			duration: true,
			chapter: {
				select: {
					id: true,
					title: true,
					lessons: {
						select: {
							id: true,
							title: true,
							description: true,
							thumbnailKey: true,
							videoKey: true,
						},
						orderBy: {
							position: "asc",
						},
					},
				},
				orderBy: {
					position: "asc",
				},
			},
		},
	});

	if (!course) {
		return notFound();
	}

	return course;
}

export type AdminCourseSingularType = Awaited<
	ReturnType<typeof getIndividualCourse>
>;

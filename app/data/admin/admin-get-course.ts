import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
	await requireAdmin();

	const data = await prisma.course.findUnique({
		where: {
			id,
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
					position: true,
					lessons: {
						select: {
							id: true,
							title: true,
							description: true,
							thumbnailKey: true,
							videoKey: true,
							position: true,
						},
					},
				},
			},
		},
	});

	if (!data) {
		return notFound();
	}

	return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>;

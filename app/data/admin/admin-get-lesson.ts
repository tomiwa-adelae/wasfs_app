import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetLesson(lessonId: string) {
	await requireAdmin();

	const data = await prisma.lesson.findUnique({
		where: {
			id: lessonId,
		},
		select: {
			title: true,
			videoKey: true,
			thumbnailKey: true,
			position: true,
			id: true,
			description: true,
		},
	});

	// if (!data) {
	// 	return notFound();
	// }

	return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;

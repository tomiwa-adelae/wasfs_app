import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";

export async function getEnrolledCourses() {
	const { user } = await requireUser();

	const data = await prisma.enrollment.findMany({
		where: {
			userId: user.id,
			status: "Active",
		},
		select: {
			Course: {
				select: {
					id: true,
					smallDescription: true,
					title: true,
					fileKey: true,
					level: true,
					slug: true,
					duration: true,
					chapter: {
						select: {
							id: true,
							lessons: {
								select: {
									id: true,
									lessonProgress: {
										where: {
											userId: user.id,
										},
										select: {
											completed: true,
											id: true,
											lessonId: true,
										},
									},
								},
							},
						},
					},
				},
			},
		},
	});

	return data;
}

export type EnrolledCourseType = Awaited<
	ReturnType<typeof getEnrolledCourses>
>[0];

import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
	await requireAdmin();

	const [totalSignups, totalCustomers, totalCourses, totalLessons] =
		await Promise.all([
			prisma.user.count(),
			// Total signups

			// total customers
			prisma.user.count({
				where: {
					enrollment: {
						some: {},
					},
				},
			}),

			// Total courses
			prisma.course.count(),

			// Total lesson
			prisma.lesson.count(),
		]);

	return { totalSignups, totalCustomers, totalCourses, totalLessons };
}

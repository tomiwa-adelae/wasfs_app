"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(fixedWindow({ mode: "LIVE", window: "1m", max: 5 }));

export const deleteCourse = async (courseId: string): Promise<ApiResponse> => {
	const session = await requireAdmin();
	try {
		const req = await request();

		const decision = await aj.protect(req, {
			fingerprint: session?.user?.id as string,
		});

		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				return {
					status: "error",
					message: "You've been blocked due to rate limiting",
				};
			} else {
				return {
					status: "error",
					message:
						"You are a bot. If this is a mistake, contact support",
				};
			}
		}

		await prisma.course.delete({
			where: {
				id: courseId,
			},
		});

		revalidatePath("/admin/courses");

		return { status: "success", message: "Course deleted successfully" };
	} catch (error) {
		return { status: "error", message: "Failed to delete course" };
	}
};

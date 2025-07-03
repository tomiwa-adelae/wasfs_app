"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(fixedWindow({ mode: "LIVE", window: "1m", max: 5 }));

export async function createCourse(
	values: CourseSchemaType
): Promise<ApiResponse> {
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

		const validation = courseSchema.safeParse(values);

		if (!validation.success) {
			return { status: "error", message: "Invalid form data" };
		}

		await prisma.course.create({
			data: {
				...validation.data,
				userId: session?.user?.id as string,
			},
		});

		return { status: "success", message: "Course successfully created" };
	} catch {
		return { status: "error", message: "Failed to create course!" };
	}
}

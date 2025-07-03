"use server";

import { requireUser } from "@/app/data/user/require-user";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";

const aj = arcjet.withRule(
	fixedWindow({
		mode: "LIVE",
		window: "1m",
		max: 5,
	})
);

export const enrollInCourseAction = async (
	courseId: string
): Promise<ApiResponse> => {
	const { user } = await requireUser();

	try {
		const req = await request();

		const decision = await aj.protect(req, {
			fingerprint: user.id,
		});

		if (decision.isDenied()) {
			return {
				status: "error",
				message: "You have been blocked",
			};
		}

		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
			},
			select: {
				id: true,
				price: true,
				title: true,
				slug: true,
			},
		});

		if (!course) return { status: "error", message: " Course not found" };

		const result = await prisma.$transaction(async (tx) => {
			const existingEnrollment = await tx.enrollment.findUnique({
				where: {
					userId_courseId: {
						userId: user.id,
						courseId: courseId,
					},
				},
				select: {
					status: true,
					id: true,
				},
			});
			if (existingEnrollment?.status === "Active") {
				return {
					status: "success",
					message: "You are already enrolled in this course",
				};
			}

			let enrollment;
			if (existingEnrollment) {
				enrollment = await tx.enrollment.update({
					where: {
						id: existingEnrollment.id,
					},
					data: {
						amount: course.price,
						status: "Pending",
						updatedAt: new Date(),
					},
				});
			} else {
				enrollment = await tx.enrollment.create({
					data: {
						userId: user.id,
						courseId: course.id,
						amount: course.price,
						status: "Pending",
					},
				});
			}
		});

		return {
			status: "success",
			message: "You have successfully enrolled in the course",
		};
	} catch (error) {
		return { status: "error", message: "Failed to enroll in course" };
	}
};

export const updateEnrolledCourse = async (
	courseId: string,
	status: "Pending" | "Active" | "Cancelled"
): Promise<ApiResponse> => {
	const { user } = await requireUser();

	try {
		const req = await request();

		const decision = await aj.protect(req, {
			fingerprint: user.id,
		});

		if (decision.isDenied()) {
			return {
				status: "error",
				message: "You have been blocked",
			};
		}

		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
			},
			select: {
				id: true,
				price: true,
				title: true,
				slug: true,
			},
		});

		if (!course) return { status: "error", message: " Course not found" };

		const result = await prisma.$transaction(async (tx) => {
			const existingEnrollment = await tx.enrollment.findUnique({
				where: {
					userId_courseId: {
						userId: user.id,
						courseId: courseId,
					},
				},
				select: {
					status: true,
					id: true,
				},
			});
			if (existingEnrollment?.status === "Active") {
				return {
					status: "success",
					message: "You are already enrolled in this course",
				};
			}

			let enrollment;
			if (existingEnrollment) {
				enrollment = await tx.enrollment.update({
					where: {
						id: existingEnrollment.id,
					},
					data: {
						amount: course.price,
						status,
						updatedAt: new Date(),
					},
				});
			} else {
				enrollment = await tx.enrollment.create({
					data: {
						userId: user.id,
						courseId: course.id,
						amount: course.price,
						status,
					},
				});
			}
		});
		return {
			status: "success",
			message:
				status === "Active"
					? `You have successfully enrolled in the course`
					: "Your purchase was not successful",
		};
	} catch (error) {
		return { status: "error", message: "Failed to enroll in course" };
	}
};

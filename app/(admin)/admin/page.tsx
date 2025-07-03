import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import React, { Suspense } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	AdminCourseCard,
	AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";
import { EmptyState } from "@/components/EmptyState";
import { adminGetRecentCourses } from "@/app/data/admin/admin-get-recent-courses";
import { adminGetEnrollmentStats } from "@/app/data/admin/admin-get-enrollment-stats";

const page = async () => {
	const enrollmentData = await adminGetEnrollmentStats();
	return (
		<div className="space-y-6">
			<SectionCards />
			<ChartAreaInteractive data={enrollmentData} />
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Recent courses</h2>
					<Link
						className={buttonVariants({ variant: "outline" })}
						href="/admin/courses"
					>
						View all course
					</Link>
				</div>
				<Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
					<RenderRecentCourses />
				</Suspense>
			</div>
		</div>
	);
};

export default page;

async function RenderRecentCourses() {
	const data = await adminGetRecentCourses();

	if (data.length === 0) {
		return (
			<EmptyState
				title="You do not have any courses yet!"
				description="You do not have any courses. Create some to see them here"
				buttonText="Create new course"
				href="/admin/courses/create"
			/>
		);
	}

	return (
		<div className="grid grid-cols md:grid-cols-2 gap-6">
			{data.map((course) => (
				<AdminCourseCard key={course.id} data={course} />
			))}
		</div>
	);
}

function RenderRecentCoursesSkeletonLayout() {
	return (
		<div className="grid grid-cols md:grid-cols-2 gap-6">
			{Array.from({ length: 2 }).map((_, index) => (
				<AdminCourseCardSkeleton key={index} />
			))}
		</div>
	);
}

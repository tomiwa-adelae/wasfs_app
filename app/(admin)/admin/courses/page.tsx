import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import {
	AdminCourseCard,
	AdminCourseCardSkeleton,
} from "./_components/AdminCourseCard";
import { EmptyState } from "@/components/EmptyState";

const page = () => {
	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-bold">Your courses</h1>
				<Link href="/admin/courses/create" className={buttonVariants()}>
					Create course
				</Link>
			</div>
			<Suspense fallback={<AdminCourseCardSkeletonLayout />}>
				<RenderCourses />
			</Suspense>
		</div>
	);
};

export default page;

async function RenderCourses() {
	const data = await adminGetCourses();

	return (
		<>
			{data.length === 0 ? (
				<EmptyState
					title={"No courses found"}
					description="Create a new course to get started"
					buttonText="Create course"
					href="/admin/courses/create"
				/>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
					{data.map((course) => (
						<AdminCourseCard key={course.id} data={course} />
					))}
				</div>
			)}
		</>
	);
}

function AdminCourseCardSkeletonLayout() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
			{Array.from({ length: 4 }).map((_, index) => (
				<AdminCourseCardSkeleton key={index} />
			))}
		</div>
	);
}

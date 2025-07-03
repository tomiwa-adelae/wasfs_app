import React, { Suspense } from "react";
import { CourseCard, CourseCardSkeleton } from "./CourseCard";
import { getAllCourses } from "@/app/data/course/get-all-courses";

export const RecommendedCourses = async () => {
	return (
		<div className="container py-12">
			<h2 className="text-3xl font-semibold text-center text-primary">
				Choose From Our World-Class Forensic Programs
			</h2>

			<Suspense fallback={<LoadingSkeletonLayout />}>
				<RenderCourses />
			</Suspense>
		</div>
	);
};

async function RenderCourses() {
	const courses = await getAllCourses();

	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
			{courses?.map((course) => (
				<CourseCard key={course.id} data={course} />
			))}
		</div>
	);
}

function LoadingSkeletonLayout() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{Array.from({ length: 9 }).map((_, index) => (
				<CourseCardSkeleton key={index} />
			))}
		</div>
	);
}

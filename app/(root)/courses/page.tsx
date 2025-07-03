import { getAllCourses } from "@/app/data/course/get-all-courses";
import React, { Suspense } from "react";
import { CourseCard, CourseCardSkeleton } from "../_components/CourseCard";

export const dynamic = "force-dynamic";

const page = () => {
	return (
		<div className="mt-5 container">
			<div className="flex flex-col space-y-2 mb-10">
				<h1 className="text-3xl md:text-4xl font-bold">
					Explore courses
				</h1>
				<p className="text-muted-foreground">
					Discover our wide range of courses designed to help you
					achieve your learning goals
				</p>
			</div>
			<Suspense fallback={<LoadingSkeletonLayout />}>
				<RenderCourses />
			</Suspense>
		</div>
	);
};

export default page;

async function RenderCourses() {
	const courses = await getAllCourses();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

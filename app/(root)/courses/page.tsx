import { getAllCourses } from "@/app/data/course/get-all-courses";
import React, { Suspense } from "react";
import { CourseCard, CourseCardSkeleton } from "../_components/CourseCard";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Courses | WASFS Courses",
	description:
		"Explore WASFS forensic training programs, including forensic accounting, criminal investigations, digital forensics, and fraud auditing. Enroll today in accredited forensic courses.",
	keywords:
		"forensic programs, forensic certifications, forensic courses online, digital forensics training, fraud auditing certification, cybercrime investigation courses, forensic science education, forensic diploma, IICFIP accredited training, wasfs, prof akinteye ademola, ademola, akinteye, simon akinteye, about",
};

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

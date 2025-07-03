import React from "react";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { getAllCourses } from "../data/course/get-all-courses";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { CourseCard } from "../(root)/_components/CourseCard";
import { EmptyState } from "@/components/EmptyState";

const page = async () => {
	const [courses, enrolledCourses] = await Promise.all([
		getAllCourses(),
		getEnrolledCourses(),
	]);
	return (
		<>
			<div className="flex flex-col gap-2">
				<h1 className="font-bold text-3xl">Enrolled courses</h1>
				<p className="text-muted-foreground">
					Here you can see all the courses you have access to
				</p>
			</div>
			{enrolledCourses.length === 0 ? (
				<EmptyState
					title="No courses purchased"
					description="You have not purchased any courses yet."
					buttonText="Browse courses"
					href="/courses"
				/>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{enrolledCourses.map((course) => (
						<CourseProgressCard
							key={course.Course.id}
							data={course}
						/>
					))}
				</div>
			)}

			<section className="mt-10">
				<div className="flex flex-col gap-2 mb-5">
					<h1 className="font-bold text-3xl">Available courses</h1>
					<p className="text-muted-foreground">
						Here you can see all the courses you can purchase
					</p>
				</div>

				{courses.filter(
					(course) =>
						!enrolledCourses.some(
							({ Course: enrolled }) => enrolled.id === course.id
						)
				).length === 0 ? (
					<EmptyState
						title="No courses available"
						description="You have already purchased all available courses."
						buttonText="Browse courses"
						href="/courses"
					/>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{courses
							.filter(
								(course) =>
									!enrolledCourses.some(
										({ Course: enrolled }) =>
											enrolled.id === course.id
									)
							)
							.map((course) => (
								<CourseCard key={course.id} data={course} />
							))}
					</div>
				)}
			</section>
		</>
	);
};

export default page;

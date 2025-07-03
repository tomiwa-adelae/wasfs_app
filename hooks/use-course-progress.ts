"use client";
import { CourseSidebarDataType } from "@/app/data/user/get-course-sidebar-data";
import { useMemo } from "react";

interface Props {
	courseData: CourseSidebarDataType["course"];
}

interface CourseProgressResult {
	totalLessons: number;
	completedLessons: number;
	progressPercentage: number;
}

export function useCourseProgress({ courseData }: Props): CourseProgressResult {
	return useMemo(() => {
		let totalLessons = 0;
		let completedLessons = 0;

		courseData.chapter.forEach((chapter) => {
			chapter.lessons.forEach((lesson) => {
				totalLessons++;

				const isCompleted = lesson.lessonProgress.some(
					(progress) =>
						progress.lessonId === lesson.id && progress.completed
				);
				if (isCompleted) {
					completedLessons++;
				}
			});
		});

		const progressPercentage =
			totalLessons > 0
				? Math.round((completedLessons / totalLessons) * 100)
				: 0;

		return {
			totalLessons,
			completedLessons,
			progressPercentage,
		};
	}, [courseData]);
}

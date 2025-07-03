import { getLessonContent } from "@/app/data/user/get-lesson-content";
import React, { Suspense } from "react";
import { CourseContent } from "./_components/CourseContent";
import { LessonSkeleton } from "./_components/LessonSkeleton";

interface Props {
	params: Promise<{ lessonId: string }>;
}

const page = async ({ params }: Props) => {
	const { lessonId } = await params;

	return (
		<Suspense fallback={<LessonSkeleton />}>
			<LessonContentLoader lessonId={lessonId} />
		</Suspense>
	);
};

export default page;

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
	const lesson = await getLessonContent(lessonId);

	return <CourseContent data={lesson} />;
}

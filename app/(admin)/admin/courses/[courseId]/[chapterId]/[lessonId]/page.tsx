import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import React from "react";
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
	courseId: string;
	chapterId: string;
	lessonId: string;
}>;

const page = async ({ params }: { params: Params }) => {
	const { courseId, lessonId, chapterId } = await params;

	const lesson = await adminGetLesson(lessonId);
	return (
		<div>
			<LessonForm
				courseId={courseId}
				data={lesson}
				chapterId={chapterId}
			/>
		</div>
	);
};

export default page;

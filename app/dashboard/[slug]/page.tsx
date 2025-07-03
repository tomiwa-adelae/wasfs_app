import { getCourseSidebarData } from "@/app/data/user/get-course-sidebar-data";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
	params: Promise<{ slug: string }>;
}

const page = async ({ params }: Props) => {
	const { slug } = await params;

	const course = await getCourseSidebarData(slug);

	const firstChapter = course.course.chapter[0];
	const firstLesson = firstChapter.lessons[0];

	if (firstLesson) {
		redirect(`/dashboard/${slug}/${firstLesson.id}`);
	}

	return (
		<div className="flex flex-col items-center justify-center h-full text-center">
			<h2 className="text-2xl font-bold mb-2">No lessons available</h2>
			<p className="text-muted-foreground text-sm">
				This course does not have any lessons yet!
			</p>
		</div>
	);
};

export default page;

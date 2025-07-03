import React, { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/user/get-course-sidebar-data";

interface Props {
	params: Promise<{ slug: string }>;
	children: ReactNode;
}

export default async function CourseLayout({ children, params }: Props) {
	const { slug } = await params;

	const course = await getCourseSidebarData(slug);

	return (
		<div className="flex flex-1">
			<div className="w-80 border-r border-border shrink-0">
				<CourseSidebar course={course.course} />
			</div>
			<div className="flex-1 overflow-hidden">{children}</div>
		</div>
	);
}

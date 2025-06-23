import { NoAdminData } from "@/components/shared/NoAdminData";
import { getUserInfo } from "@/lib/actions/students/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { DashboardAnalytics } from "../components/DashboardAnalytics";
import { getUsers } from "@/lib/actions/admin/student.actions";
import { getPrograms } from "@/lib/actions/admin/program.actions";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	// const students = await getStudents({ userId: user?.user?._id });
	const users = await getUsers({ userId: user?.user?._id });
	const programs = await getPrograms({ userId: user?.user?._id });
	return (
		<div>
			<div className="container">
				{programs?.programs?.length === 0 && <NoAdminData />}
				{programs?.programs?.length !== 0 && (
					<div>
						<h2 className="font-semibold text-2xl md:text-3xl">
							Welcome back, {user?.user?.firstName}
						</h2>
						<DashboardAnalytics
							programs={programs?.programs}
							// students={students?.students}
							students={users?.users}
							users={users?.users}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default page;

import {
	Building,
	GraduationCap,
	NotepadText,
	TrendingUp,
	Users,
} from "lucide-react";
import { DashboardBox } from "./DashboardBox";
import { IUser } from "@/lib/database/models/user.model";
import { IProgram } from "@/lib/database/models/program.model";

interface Props {
	students: IUser[];
	users: IUser[];
	programs: IProgram[];
}

export const DashboardAnalytics = ({ programs, students, users }: Props) => {
	return (
		<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<DashboardBox
				title={"Total signups"}
				titleIcon={Users}
				number={students?.length}
				icon={TrendingUp}
				slug="/all-users"
			/>
			<DashboardBox
				title={"Total students"}
				titleIcon={GraduationCap}
				number={users.length}
				icon={TrendingUp}
				slug="/all-students"
			/>
			<DashboardBox
				title={"Total programs"}
				titleIcon={NotepadText}
				number={programs?.length}
				icon={TrendingUp}
				slug="/all-programs"
			/>
		</div>
	);
};

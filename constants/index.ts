import {
	CircleUser,
	FolderClock,
	GraduationCap,
	Info,
	LayoutDashboard,
	Plus,
	Users,
} from "lucide-react";

export const navLinks = [
	{
		slug: "/about",
		label: "About us",
	},
	{
		slug: "/programs",
		label: "Our programs",
	},
	{
		slug: "contact",
		label: "Contact us",
	},
];

export const userNavLinks = [
	{
		icon: CircleUser,
		slug: "/profile",
		label: "Profile",
	},
	{
		icon: Info,
		slug: "/about",
		label: "About me",
	},
	{
		icon: FolderClock,
		slug: "/my-programs",
		label: "My programs",
	},
];

export const adminNavLinks = [
	{
		slug: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		slug: "/all-programs",
		label: "Our programs",
		icon: GraduationCap,
	},
	{
		slug: "/all-programs/new",
		label: "Create a new program",
		icon: Plus,
	},
	{
		slug: "/all-students",
		label: "Students",
		icon: Users,
	},
	{
		slug: "/profile",
		label: "Your profile",
		icon: CircleUser,
	},
];

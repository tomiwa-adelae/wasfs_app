import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getUserInfo } from "@/lib/actions/students/user.actions";
import { AppNavbar } from "./components/AppNavbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
	title: "Admin dashboard - WASFS",
};

export default async function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	if (!user?.user || !user?.user.isAdmin) return redirect("/sign-in");

	return (
		<div>
			<AppNavbar user={user?.user} />
			<div className="pt-20 min-h-[90vh]">{children}</div>
			<Footer />
		</div>
	);
}

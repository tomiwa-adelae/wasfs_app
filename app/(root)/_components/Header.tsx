"use client";
import { Logo } from "@/components/sidebar/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DEFAULT_PROFILE_PICTURE, navItems } from "@/constants";
import Link from "next/link";
import React from "react";
import { MobileNavbar } from "./MobileNavbar";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "@/components/UserDropdown";

export const Header = () => {
	const { data: session, isPending } = authClient.useSession();

	return (
		<header className="z-50 fixed top-0 left-0 w-full bg-white dark:bg-black border-b border-border py-2 h-20 flex items-center justify-center">
			<div className="container flex items-center justify-between gap-4">
				<Logo />
				<nav className="hidden flex-1 lg:flex items-center justify-center gap-2 lg:gap-8">
					{navItems.map(({ slug, label }) => (
						<Link
							key={slug}
							href={slug}
							className="text-sm font-medium hover:text-primary transition-all"
						>
							{label}
						</Link>
					))}
				</nav>
				<div className="hidden lg:flex items-center justify-end gap-4">
					<ThemeToggle />
					{!isPending && session && (
						<UserDropdown
							name={session.user.name}
							image={
								session.user.image ?? DEFAULT_PROFILE_PICTURE
							}
							email={session.user.email}
						/>
					)}
					{!isPending && !session && (
						<>
							<Button asChild variant={"outline"}>
								<Link href={"/login"}>Login</Link>
							</Button>
							<Button asChild>
								<Link href={"/register"}>Get started</Link>
							</Button>
						</>
					)}
				</div>
				<div className="lg:hidden flex items-center justify-end gap-2">
					{!isPending && session && (
						<UserDropdown
							name={session.user.name}
							image={
								session.user.image ?? DEFAULT_PROFILE_PICTURE
							}
							email={session.user.email}
						/>
					)}
					<MobileNavbar />
				</div>
			</div>
		</header>
	);
};

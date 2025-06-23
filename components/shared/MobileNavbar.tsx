"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { adminNavLinks, navLinks, userNavLinks } from "@/constants";
import { LogOut, Menu, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { useClerk } from "@clerk/nextjs";
import { Logo } from "./Logo";

export function MobileNavbar({ user }: { user: any }) {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state
	const pathname = usePathname();
	const router = useRouter();
	const { signOut } = useClerk();

	const handleLogout = async () => {
		await signOut();
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};

	const handleClick = () => {
		if (setOpenMobile) {
			setOpenMobile(false);
		}
	};

	const isActive = (slug: string) =>
		pathname === slug || pathname.startsWith(`${slug}/`);

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="bg-[#F5F4F7] size-10"
					size={"icon"}
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<ScrollArea className="h-screen">
					<div className="container pb-20">
						<div className="flex flex-1 flex-col overflow-x-hidden">
							<SheetClose asChild>
								<Logo />
							</SheetClose>
							<div className="mt-8 flex flex-col gap-1">
								<Link
									href={"/spaces"}
									className={`group flex items-center justify-start gap-2 group/sidebar                             ${
										isActive("/spaces") && "bg-[#F2F2F2]"
									} hover:bg-[#F2F2F2] p-4 rounded-lg
                            `}
									onClick={handleClick}
								>
									<span className="text-base font-medium">
										Home
									</span>
								</Link>
								{navLinks.map(({ label, slug }, idx) => (
									<Link
										key={idx}
										href={slug}
										className={`group flex items-center justify-start gap-2 group/sidebar
                            ${
								isActive(slug) && "bg-[#F2F2F2]"
							} hover:bg-[#F2F2F2] p-4 rounded-lg
                            `}
										onClick={handleClick}
									>
										<span className="text-base font-medium">
											{label}
										</span>
									</Link>
								))}
							</div>
							<div className="flex flex-col mt-4 w-full items-center justify-end gap-4">
								<SheetClose asChild>
									<Button
										asChild
										size="md"
										className="text-sm w-full"
									>
										<Link href="/spaces">Book a space</Link>
									</Button>
								</SheetClose>
							</div>
						</div>
						{user && (
							<div>
								<Separator className="my-4" />
								{user?.isAdmin
									? adminNavLinks.map(
											({ label, slug, icon }, idx) => {
												const Icon = icon;
												return (
													<Link
														key={idx}
														href={slug}
														className={`group flex items-center justify-start gap-2 group/sidebar
														${isActive(slug) && "bg-[#F2F2F2]"} hover:bg-[#F2F2F2] p-4 rounded-lg
														`}
														onClick={handleClick}
													>
														<Icon className="size-5" />

														<h5 className="text-base font-medium">
															{label}
														</h5>
													</Link>
												);
											}
									  )
									: userNavLinks.map(
											({ label, slug, icon }, idx) => {
												const Icon = icon;
												return (
													<Link
														key={idx}
														href={slug}
														className={`group flex items-center justify-start gap-2 group/sidebar
														${isActive(slug) && "bg-[#F2F2F2]"} hover:bg-[#F2F2F2] p-4 rounded-lg
														`}
														onClick={handleClick}
													>
														<Icon className="size-5" />

														<h5 className="text-base font-medium">
															{label}
														</h5>
													</Link>
												);
											}
									  )}
							</div>
						)}
						{user && (
							<div
								className={`group flex items-center justify-start gap-2 group/sidebar hover:bg-[#F2F2F2] p-4 rounded-lg
														`}
								onClick={handleLogout}
							>
								<LogOut className="size-5" />

								<h5 className="text-base font-medium">
									Logout
								</h5>
							</div>
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

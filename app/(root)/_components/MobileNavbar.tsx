"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navItems } from "@/constants";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/sidebar/Logo";

export function MobileNavbar() {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state
	const pathname = usePathname();
	const router = useRouter();

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
				<Button variant="ghost" className="size-10" size={"icon"}>
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
								{navItems.map(({ label, slug }) => (
									<Link
										key={slug}
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
										variant={"ghost"}
										className="text-sm w-full"
									>
										<Link href="/spaces">Login</Link>
									</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button
										asChild
										size="md"
										className="text-sm w-full"
									>
										<Link href="/spaces">Get started</Link>
									</Button>
								</SheetClose>
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

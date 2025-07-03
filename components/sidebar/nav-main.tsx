"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		slug: string;
		icon?: Icon;
	}[];
}) {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				{pathname.startsWith("/admin") && (
					<SidebarMenu>
						<Link href="/admin/courses/create">
							<SidebarMenuItem className="flex items-center gap-2">
								<SidebarMenuButton
									tooltip="Create course"
									className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
								>
									<IconCirclePlusFilled />
									<span>Create course</span>
								</SidebarMenuButton>
								<Button
									size="icon"
									className="size-8 group-data-[collapsible=icon]:opacity-0"
									variant="outline"
								>
									<Plus />
									<span className="sr-only">Plus</span>
								</Button>
							</SidebarMenuItem>
						</Link>
					</SidebarMenu>
				)}
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild tooltip={item.title}>
								<Link
									href={item.slug}
									className={cn(
										pathname === item.slug &&
											pathname.startsWith(item.slug) &&
											"bg-accent text-accent-foreground"
									)}
								>
									{item.icon && (
										<item.icon
											className={cn(
												pathname === item.slug &&
													pathname.startsWith(
														item.slug
													) &&
													"text-primary"
											)}
										/>
									)}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

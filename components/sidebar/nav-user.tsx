"use client";

import {
	IconDotsVertical,
	IconLogout,
	IconUsersGroup,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { useSignout } from "@/hooks/use-signout";
import { Home, Tv2 } from "lucide-react";
import Link from "next/link";

export function NavUser() {
	const { isMobile } = useSidebar();

	const handleSignout = useSignout();

	const { data: session } = authClient.useSession();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={
										session?.user.image ??
										DEFAULT_PROFILE_PICTURE
									}
									alt={`${session?.user.name}'s profile image`}
								/>
								<AvatarFallback>
									{session?.user.name[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{session?.user.name}
								</span>
								<span className="text-muted-foreground truncate text-xs">
									{session?.user.email}
								</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={
											session?.user.image ??
											DEFAULT_PROFILE_PICTURE
										}
										alt={`${session?.user.name}'s profile image`}
									/>
									<AvatarFallback>
										{session?.user.name[0].toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{session?.user.name}
									</span>
									<span className="text-muted-foreground truncate text-xs">
										{session?.user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href="/">
									<Home />
									Home
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/admin/courses">
									<Tv2 />
									Courses
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/admin/customers">
									<IconUsersGroup />
									Customers
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignout}>
							<IconLogout />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

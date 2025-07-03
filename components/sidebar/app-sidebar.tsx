"use client";

import * as React from "react";
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
	IconUsersGroup,
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";

import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";

const data = {
	navMain: [
		{
			title: "Dashboard",
			slug: "/admin",
			icon: IconDashboard,
		},
		{
			title: "Courses",
			slug: "/admin/courses",
			icon: IconListDetails,
		},
		{
			title: "Analytics",
			slug: "#",
			icon: IconChartBar,
		},
		{
			title: "Customers",
			slug: "/admin/customers",
			icon: IconUsersGroup,
		},
		{
			title: "Team",
			slug: "#",
			icon: IconUsers,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Logo />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}

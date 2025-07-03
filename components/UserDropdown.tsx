"use client";
import {
	BoltIcon,
	BookOpenIcon,
	ChevronDownIcon,
	Layers2Icon,
	LogOutIcon,
	PinIcon,
	UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBook, IconDashboard } from "@tabler/icons-react";
import { useSignout } from "@/hooks/use-signout";

interface Props {
	name: string;
	image: string;
	email: string;
}

export function UserDropdown({ image, email, name }: Props) {
	const handleSignout = useSignout();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto p-0 hover:bg-transparent"
				>
					<Avatar>
						<AvatarImage
							src={image}
							alt={`${name}'s profile image`}
						/>
						<AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
					</Avatar>
					<ChevronDownIcon
						size={16}
						className="opacity-60"
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="max-w-64">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						{name}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconDashboard
							size={16}
							className="opacity-60"
							aria-hidden="true"
						/>
						<span>Dashboard</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconBook
							size={16}
							className="opacity-60"
							aria-hidden="true"
						/>
						<span>My courses</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignout}>
					<LogOutIcon
						size={16}
						className="opacity-60"
						aria-hidden="true"
					/>
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
	title: string;
	description: string;
	buttonText: string;
	href: string;
}

export const EmptyState = ({ title, description, buttonText, href }: Props) => {
	return (
		<div className="flex flex-col h-full flex-1 items-center justify-center rounded-md border-dashed border p-8 text-center animate-in fade-in-50">
			<div className="size-20 flex items-center justify-center rounded-full bg-primary/10">
				<Ban className="size-10 text-primary" />
			</div>
			<h2 className="mt-6 text-xl font-semibold">{title}</h2>
			<p className="mb-8 mt-2 text-center leading-tight text-muted-foreground">
				{description}
			</p>
			<Button asChild>
				<Link href={href}>
					<PlusCircle className="size-4 mr-2" />
					{buttonText}
				</Link>
			</Button>
		</div>
	);
};

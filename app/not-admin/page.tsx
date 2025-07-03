import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<Card className="max-w-md w-full">
				<CardHeader className="text-center">
					<div className="bg-destructive/20 text-center rounded-full p-4 w-fit mx-auto">
						<ShieldX className="size-16 text-destructive" />
					</div>
					<CardTitle className="text-2xl">
						Access restricted
					</CardTitle>
					<CardDescription className="max-w-xs text-muted-foreground mx-auto">
						Hey! You are not an admin which means you cannot create
						any courses or stuff like that...
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link
						className={buttonVariants({ className: "w-full" })}
						href="/"
					>
						<ArrowLeft className="mr-1 size-4" />
						Back to home
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default page;

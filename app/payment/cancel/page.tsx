import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="w-full min-h-screen flex flex-1 justify-center items-center">
			<Card className="w-[350px]">
				<CardContent>
					<div className="flex justify-center">
						<XIcon className="size-12 bg-red-500/300 p-2 rounded-full text-red-500" />
					</div>
					<div className="mt-3 text-center sm:mt-5 w-full">
						<h2 className="font-semibold text-xl">
							Payment cancelled
						</h2>
						<p className="text-center text-muted-foreground tracking-tight text-balance mt-2 text-sm">
							No worries, you would not be charged. Please try
							again
						</p>

						<Link
							className={buttonVariants({
								className: "w-full mt-5",
							})}
							href="/"
						>
							Go back to home page
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default page;

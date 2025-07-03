"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/useConfetti";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export const SuccessComponent = () => {
	const { triggerConfetti } = useConfetti();

	useEffect(() => {
		triggerConfetti();
	}, []);
	return (
		<div className="w-full min-h-screen flex flex-1 justify-center items-center">
			<Card className="w-[350px]">
				<CardContent>
					<div className="flex justify-center">
						<CheckIcon className="size-12 rounded-full p-2 bg-green-500/30 text-green-500" />
					</div>
					<div className="mt-3 text-center sm:mt-5 w-full">
						<h2 className="font-semibold text-xl">
							Payment successful
						</h2>
						<p className="text-center text-muted-foreground tracking-tight text-balance mt-2 text-sm">
							Congrats! Your payment was successful. You should
							have access to the course
						</p>

						<Link
							className={buttonVariants({
								className: "w-full mt-5",
							})}
							href="/dashboard"
						>
							Go to course
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

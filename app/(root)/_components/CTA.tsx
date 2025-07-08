import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CTA = () => {
	return (
		<div className="py-16">
			<div className="container grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-6">
				<div className="bg-[#F4F8FB] dark:bg-muted bg-right shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-16 border border-border rounded-lg flex flex-col items-center text-center justify-center px-6 gap-2">
					<div className="flex-1">
						<h3 className="text-blue-400 font-semibold text-2xl">
							Earn a certificate
						</h3>
						<p className="text-sm md:text-base text-muted-foreground mt-2 mb-6">
							Get the right professional certificate program for
							you
						</p>
						<Button asChild size="md" variant={"blue"}>
							<Link href="/courses">View courses</Link>
						</Button>
					</div>
					<Image
						src={"/assets/images/cta2.svg"}
						alt="Icon"
						width={1000}
						height={1000}
						className="size-full aspect-auto object-cover"
					/>
				</div>
				<div className="bg-[#F5F5F6] bg-right shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border border-border py-10 rounded-lg flex flex-col items-center text-center justify-center px-6 gap-2">
					<div className="flex-1">
						<h3 className="text-primary font-semibold text-2xl">
							Get started
						</h3>
						<p className="text-sm md:text-base text-muted-foreground mt-2 mb-6">
							Are you ready to start your professional courses
							with WASFS?
						</p>
						<Button asChild size="md">
							<Link href="/register">Get started</Link>
						</Button>
					</div>
					<Image
						src={"/assets/images/cta1.svg"}
						alt="Icon"
						width={1000}
						height={1000}
						className="size-full aspect-auto object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

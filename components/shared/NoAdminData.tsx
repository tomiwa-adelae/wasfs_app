import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NoAdminData = () => {
	return (
		<div className="flex flex-col items-center text-center justify-center">
			<h2 className="font-semibold text-2xl md:text-3xl">
				Welcome to your WASFS Dashboard
			</h2>
			<Image
				src={"/assets/icons/graduation-cap.svg"}
				alt="Graduation cap icon"
				width={1000}
				height={1000}
				className="size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-sm md:text-base mt-4 mb-6 leading-relaxed">
				It looks like you haven’t created any program yet.{" "}
				<br className="hidden md:block" />
				Let’s get started by adding your first program!
			</p>
			<Button asChild size="md" variant="secondary">
				<Link href="/all-programs/new">Create a program</Link>
			</Button>
		</div>
	);
};

import { Logo } from "@/components/sidebar/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex py-32 items-center justify-center min-h-screen">
			<Button
				asChild
				variant={"outline"}
				className="absolute top-4 left-4"
			>
				<Link href="/">
					<ArrowLeft className="size-4" />
					Back
				</Link>
			</Button>
			<div className="flex flex-col items-center justify-center gap-4 w-full">
				<Link className="flex items-center justify-center" href="/">
					<Logo />
				</Link>
				<div className="w-full max-w-md">{children}</div>
			</div>
		</div>
	);
};

export default layout;

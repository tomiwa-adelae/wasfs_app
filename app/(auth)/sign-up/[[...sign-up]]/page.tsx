import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="w-full">
			<div className="mt-12">
				<h1 className="text-2xl max-w-md leading-snug md:text-3xl font-semibold mx-auto text-center">
					Sign up with WASFS
				</h1>
			</div>
			<div>
				<SignUp />
			</div>
			<p className="text-sm text-center text-muted-foreground mt-8">
				Already have an account?{" "}
				<Link
					className="text-primary hover:text-black underline font-semibold transition-all"
					href="/sign-in"
				>
					Log in
				</Link>
			</p>
		</div>
	);
};

export default page;

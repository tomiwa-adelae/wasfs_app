import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
	return (
		<Link href="/">
			<Image
				src={"/assets/images/wasfs-logo.png"}
				alt={"WASFS logo"}
				width={1000}
				height={1000}
				className="w-[250px] md:w-[280px] lg:w-[350px] object-cover h-full"
			/>
		</Link>
	);
};

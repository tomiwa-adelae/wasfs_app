import React from "react";

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="py-4 border-t h-16 flex items-center justify-start">
			<p className="container text-base text-center text-muted-foreground">
				&copy; {year} West Africa School of Forensic Studies. All rights
				reserved.
			</p>
		</footer>
	);
};

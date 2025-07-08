import Link from "next/link";
import { Button } from "@/components/ui/button";
import { footerDetails, socialLinks } from "@/constants";
import { Logo } from "@/components/sidebar/Logo";

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-[#1B1D37] text-white dark:bg-black dark:text-white">
			<div className="container">
				<div className="py-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
					<div className="lg:col-span-2">
						<div>
							<Logo />
						</div>
						<p className="text-white/80 dark:text-gray-200 text-base mt-4">
							Connecting people with the perfect workspace for
							productivity and collaboration.
						</p>
						<div className="flex items-center text-primary justify-start gap-6 mt-8">
							{socialLinks.map(({ icon, name, slug }, index) => {
								const Icon = icon;
								return (
									<Button
										size="icon"
										asChild
										variant="outline"
										key={index}
									>
										<a
											href={slug}
											target="_blank"
											// className="flex items-center justify-start gap-4 group hover:text-secondary transition-all"
										>
											<Icon className="hover:text-secondary transition-all" />
										</a>
									</Button>
								);
							})}
						</div>
					</div>
					{footerDetails.map(({ title, links }, index) => (
						<div key={index}>
							<h3 className="text-sm md:text-base font-semibold tracking-wider">
								{title}
							</h3>
							<ul className="mt-4 space-y-4">
								{links.map(({ slug, label }, idx) => (
									<li key={idx}>
										<Link
											className="text-sm hover:text-primary transition-all text-white/80"
											href={slug}
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<div className="transition-all pb-8 text-center font-medium text-sm">
				<p className="container">
					&copy; {year} WASFS. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

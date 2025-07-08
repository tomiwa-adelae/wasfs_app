import { Button } from "@/components/ui/button";
import { contactDetails, socialLinks } from "@/constants";
import { Check } from "lucide-react";
import React from "react";
import { ContactForm } from "../_components/ContactForm";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CTA } from "../_components/CTA";
import { Testimonials } from "../_components/Testimonials";
import { FAQs } from "../_components/FAQs";
import { WASFSMap } from "../_components/WASFSMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact WASFS | Get in Touch for Forensic Training & Support",
	description:
		"Need help? Contact the West African School of Forensic Studies (WASFS) for inquiries about programs, enrollment, and support. Reach us via email, phone, or chat.",
	keywords:
		"contact WASFS, forensic training support, forensic certification inquiries, forensic course assistance, WASFS admissions contact, wasfs, prof akinteye ademola, ademola, akinteye, simon akinteye, about",
};

const page = () => {
	return (
		<div>
			<div className="container pt-12">
				<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
					Get in touch
				</h1>
				<p className="text-muted-foreground dark:text-accent-foreground/70 text-base mt-2">
					Have a question or need assistance? Reach out to our
					dedicated support team. We're here to help with any
					inquiries you may have.
				</p>
				<div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-8">
					<div>
						<div className="grid gap-4">
							<div className="flex gap-2 items-center justify-start text-muted-foreground">
								<Button
									className="rounded-full"
									size="icon"
									variant="outline"
								>
									<Check />
								</Button>
								<span className="text-base">
									Personalized assistance
								</span>
							</div>
							<div className="flex gap-2 items-center justify-start text-muted-foreground">
								<Button
									className="rounded-full"
									size="icon"
									variant="outline"
								>
									<Check />
								</Button>
								<span className="text-base">
									Timely response
								</span>
							</div>
							<div className="flex gap-2 items-center justify-start text-muted-foreground">
								<Button
									className="rounded-full"
									size="icon"
									variant="outline"
								>
									<Check />
								</Button>
								<span className="text-base">
									Comprehensive support
								</span>
							</div>
						</div>
						<div className="flex mt-8 items-center justify-start gap-4">
							{socialLinks.map(({ icon, name, slug }) => {
								const Icon = icon;
								return (
									<Button
										key={slug}
										asChild
										size="icon"
										variant="outline"
									>
										<a href={slug}>
											<Icon />
										</a>
									</Button>
								);
							})}
						</div>
					</div>
					<div>
						<ContactForm />
					</div>
				</div>
				<div className="grid grid-cols-1 mt-8 md:grid-cols-3 gap-4">
					{contactDetails.map(({ slug, text, name, icon }) => {
						const Icon = icon;
						return (
							<div
								key={slug}
								className="rounded-lg border border-border p-6 relative"
							>
								<GlowingEffect
									spread={40}
									glow={true}
									disabled={false}
									proximity={64}
									inactiveZone={0.01}
								/>
								<Button size="icon" asChild variant="outline">
									<a href={slug}>
										<Icon />
									</a>
								</Button>
								<h4 className="mt-4 font-medium text-lg">
									{name}
								</h4>
								<a
									href={slug}
									className="text-muted-foreground hover:underline hover:text-primary transition-all text-sm"
								>
									{text}
								</a>
							</div>
						);
					})}
				</div>
				<div className="pt-10">
					<WASFSMap />
				</div>
			</div>
			<CTA />
			<Testimonials />
			<FAQs />
		</div>
	);
};

export default page;

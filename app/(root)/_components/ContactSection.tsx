import { Button } from "@/components/ui/button";
import { contactDetails, socialLinks } from "@/constants";
import { Check } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ContactForm } from "./ContactForm";

export const ContactSection = () => {
	return (
		<div className="py-12">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
							Reach out
						</h2>
						<p className="text-muted-foreground text-base mt-2">
							Have a question or need assistance? Reach out to our
							dedicated support team. We're here to help with any
							inquiries you may have.
						</p>
						<div className="mt-4 grid gap-4">
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
								className="rounded-lg dark:bg-muted border border-border p-6 relative"
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
			</div>
		</div>
	);
};

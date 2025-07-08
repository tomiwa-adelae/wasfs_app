import { Button } from "@/components/ui/button";
import { latestNews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LatestNews = () => {
	return (
		<div className="bg-[#F4F8FB] py-12">
			<div className="container">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
					Latest news
				</h2>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="group bg-muted rounded-lg border border-border p-2.5">
							<Image
								src={latestNews[0].image}
								alt="News picture"
								width={1000}
								height={1000}
								className="aspect-video object-cover rounded-2xl size-full"
							/>
							<div className="pt-4 px-3">
								<p className="text-muted-foreground text-sm">
									{latestNews[0].date}
								</p>
								<h4 className="font-medium tracking-tight leading-snug text-xl group-hover:text-primary transition-all line-clamp-2">
									{latestNews[0].title}
								</h4>
								<Button
									className="px-0 text-primary transition-all hover:underline hover:text-primary"
									size="md"
									variant="ghost"
								>
									<Link href={latestNews[0].slug}>
										Read more
									</Link>
								</Button>
							</div>
						</div>
					</div>
					<div>
						<div className="grid gap-4">
							{latestNews
								.splice(1, 3)
								.map(({ image, title, date, slug }, index) => (
									<div
										key={index}
										className="group bg-muted rounded-lg border border-border p-2.5 grid grid-cols-6 gap-4"
									>
										<div className="col-span-2">
											<Image
												src={image}
												alt="News image"
												width={1000}
												height={1000}
												className="rounded-lg aspect-auto object-cover"
											/>
										</div>
										<div className="col-span-4 flex items-center justify-center">
											<div>
												<p className="text-muted-foreground text-xs">
													{date}
												</p>
												<h4 className="font-medium tracking-tight leading-snug text-xl group-hover:text-primary transition-all line-clamp-2">
													{title}
												</h4>
												<Button
													className="px-0 text-primary transition-all hover:underline hover:text-primary"
													size="md"
													variant="ghost"
												>
													<Link href={slug}>
														Read more
													</Link>
												</Button>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

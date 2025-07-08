import { testimonials } from "@/constants";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Testimonials = () => {
	return (
		<div
			style={{
				backgroundImage: `url(/assets/images/line-bg.png)`,
			}}
			className="pt-12 bg-scroll bg-no-repeat bg-contain bg-top-right pb-16 bg-blue-600"
		>
			<div className="container">
				<h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold text-center">
					What students say?
				</h2>
				<div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map(
						({ image, name, testimony, rotate }, index) => (
							<div
								className={cn(
									"rounded-lg bg-white dark:bg-muted p-8 hover:rotate-0 transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
									rotate
								)}
								key={index}
							>
								<div className="flex flex-col text-center items-center justify-center gap-2">
									<Image
										src={image}
										alt={`${name}'s picture`}
										width={1000}
										height={1000}
										className={cn(
											"rounded-full size-[60px] md:size-[70px] object-cover"
										)}
									/>
									<h4 className="font-medium text-lg">
										{name}
									</h4>
								</div>
								<p
									className={cn(
										"text-base text-center text-muted-foreground dark:text-gray-200 leading-relaxed mt-4"
									)}
								>
									{testimony}
								</p>
								<div className="flex items-center justify-center mt-2">
									<Quote
										className={cn(
											"size-6 text-muted-foreground"
										)}
									/>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

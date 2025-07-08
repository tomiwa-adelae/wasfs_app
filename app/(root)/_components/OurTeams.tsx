import { faculities } from "@/constants";
import Image from "next/image";
import React from "react";

export const OurTeams = () => {
	return (
		<div
			className="py-12 bg-white/40 bg-scroll bg-no-repeat bg-cover bg-center min-h-[50vh]"
			style={
				{
					// backgroundImage: `url(/assets/images/shape-bg.svg)`,
				}
			}
		>
			<div className="container">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
					Our faculties
				</h2>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{faculities.map(({ name, image, position }, index) => (
						<div key={index} className="group">
							<Image
								src={image}
								alt={`${name}'s picture`}
								width={1000}
								height={1000}
								className="object-cover rounded-lg h-[400px]"
							/>
							<div className="py-2.5">
								<h4 className="font-medium text-xl group-hover:text-primary transition-all">
									{name}
								</h4>
								<p className="text-sm text-muted-foreground dark:text-gray-200">
									{position}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

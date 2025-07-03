import { SHOWCASE_VIDEO } from "@/constants";
import React, { ReactNode } from "react";

export const Showcase = ({
	title,
	description,
	buttons,
	extras,
}: {
	title: ReactNode;
	description: ReactNode;
	buttons: ReactNode;
	extras: ReactNode;
	image: string;
}) => {
	return (
		<div className="relative">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
			>
				<source src={SHOWCASE_VIDEO} type="video/mp4" />
			</video>
			<div className="grid z-10">
				<div className={`container z-20`}>
					<div className="pt-40 pb-10 z-10">
						<h1 className="uppercase text-white text-4xl md:text-5xl lg:text-6xl font-bold lg:w-5/6">
							{title}
						</h1>
						<div className="text-gray-200 text-sm md:text-base lg:w-5/6 mt-4">
							{description}
						</div>
						<div className="flex items-center justify-start gap-4 md:gap-8 mt-8">
							{buttons}
						</div>
						{extras}
					</div>
				</div>
			</div>
			<div className="absolute inset-0 bg-black/60" />
		</div>
	);
};

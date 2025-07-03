import React from "react";
import { Showcase } from "./_components/Showcase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { wasfsCredibility } from "@/constants";
import { Check } from "lucide-react";
import { RecommendedCourses } from "./_components/RecommendedCourses";

const page = () => {
	return (
		<div>
			<Showcase
				title={
					<>
						Learn, Certify and{" "}
						<span className="text-primary">Advance</span> your
						Career
					</>
				}
				description="Gain globally recognized forensic certifications in Fraud
					Auditing, Digital Forensics, Criminal Investigation, and
					more. Mastering the art of Forensic investigations and your
					journey to success starts now!"
				buttons={
					<>
						<Button
							className="w-full md:w-auto"
							size={"lg"}
							asChild
						>
							<Link href="/admissions">Apply now</Link>
						</Button>
						<Button
							className="w-full md:w-auto"
							variant={"secondary"}
							size={"lg"}
							asChild
						>
							<Link href="/our-programs">
								Explore our Programs
							</Link>
						</Button>
					</>
				}
				image="/assets/images/home-showcase-img.jpg"
				extras={
					<div className="grid gap-4 mt-8">
						{wasfsCredibility.map((credibility, index) => (
							<div
								className="flex items-center text-white font-medium justify-start gap-2"
								key={index}
							>
								<Check className="size-4" />
								<p className="text-xs md:text-sm italic leading-relaxed">
									{credibility}
								</p>
							</div>
						))}
					</div>
				}
			/>
			<RecommendedCourses />
		</div>
	);
};

export default page;

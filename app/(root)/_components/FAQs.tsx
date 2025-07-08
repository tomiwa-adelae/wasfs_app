import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants";
import Image from "next/image";

export const FAQs = () => {
	return (
		<div className="py-12">
			<div className="container">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-primary">
					Got questions? We have some answers
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<Accordion
						type="single"
						collapsible
						className="w-full grid gap-4"
					>
						{faqs.map(({ question, answer }, index) => (
							<AccordionItem value={`${index}`} key={index}>
								<AccordionTrigger>{question}</AccordionTrigger>
								<AccordionContent>{answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
					<div className="rounded-lg overflow-hidden">
						<Image
							src={"/assets/images/faqs.jpg"}
							alt="FAQs picture"
							width={1000}
							height={1000}
							className="size-full aspect-square object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

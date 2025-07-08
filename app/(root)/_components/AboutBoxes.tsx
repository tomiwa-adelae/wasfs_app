import { aboutDetails } from "@/constants";

export const AboutBoxes = () => {
	return (
		<div className="py-12 bg-muted">
			<div className="container">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
					About WASFS
				</h2>
				<div className="grid mt-8 grid-cols-1 md:grid-cols-2 gap-4">
					{aboutDetails.map(({ icon, title, description }, index) => {
						const Icon = icon;
						return (
							<div
								key={index}
								className="border bg-white dark:bg-black border-border rounded-lg px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-start gap-4"
							>
								<div className="p-3 rounded-full border border-primary bg-primary/10">
									<Icon className="size-6 text-primary" />
								</div>
								<div>
									<h4 className="font-medium text-lg">
										{title}
									</h4>
									<p className="text-muted-foreground text-sm">
										{description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

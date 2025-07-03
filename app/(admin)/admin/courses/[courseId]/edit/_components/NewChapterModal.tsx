import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/tryCatch";
import { createChapter } from "../actions";
import { toast } from "sonner";
import { chapterSchema, ChapterSchemaType } from "@/lib/zodSchema";

export const NewChapterModal = ({ courseId }: { courseId: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	const [pending, startTransition] = useTransition();

	// 1. Define your form.
	const form = useForm<ChapterSchemaType>({
		resolver: zodResolver(chapterSchema),

		defaultValues: {
			name: "",
			courseId,
		},
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
		}
		setIsOpen(open);
	};

	async function onSubmit(values: ChapterSchemaType) {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				createChapter(values)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
				form.reset();
				setIsOpen(false);
			} else {
				toast.error(result.message);
			}
		});
	}
	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant={"outline"} size="sm" className="gap-2">
					<Plus className="size-4" />
					New chapter
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						What would you like to name your chapter
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Chapter name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button disabled={pending} className="submit">
								{pending ? (
									<>
										<Loader2 className="size-4 animate-spin" />{" "}
										Saving....
									</>
								) : (
									"Save chapter"
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

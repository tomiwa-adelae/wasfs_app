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
import { createLesson } from "../actions";
import { toast } from "sonner";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";

export const NewLessonModal = ({
	courseId,
	chapterId,
}: {
	courseId: string;
	chapterId: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const [pending, startTransition] = useTransition();

	// 1. Define your form.
	const form = useForm<LessonSchemaType>({
		resolver: zodResolver(lessonSchema),

		defaultValues: {
			name: "",
			courseId,
			chapterId,
		},
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
		}

		setIsOpen(open);
	};

	async function onSubmit(values: LessonSchemaType) {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				createLesson(values)
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
				<Button variant={"outline"} size="sm" className="gap-2 w-full">
					<Plus className="size-4" />
					New lesson
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						What would you like to name your lesson
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
											placeholder="Lesson name"
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
									"Save lesson"
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

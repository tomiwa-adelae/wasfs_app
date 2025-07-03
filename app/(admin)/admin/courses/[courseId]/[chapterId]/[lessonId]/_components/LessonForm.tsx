"use client";

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import Link from "next/link";
import { Uploader } from "@/components/file-uploader/Uploader";
import { useTransition } from "react";
import { updateLesson } from "../actions";
import { toast } from "sonner";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { tryCatch } from "@/hooks/tryCatch";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";

interface Props {
	data: AdminLessonType;
	chapterId: string;
	courseId: string;
}

export const LessonForm = ({ data, chapterId, courseId }: Props) => {
	const [pending, startTransition] = useTransition();
	// 1. Define your form.
	const form = useForm<LessonSchemaType>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			name: data?.title,
			description: data?.description ?? undefined,
			videoKey: data?.videoKey ?? undefined,
			thumbnailKey: data?.thumbnailKey ?? undefined,
			courseId: courseId,
			chapterId: chapterId,
		},
	});

	function onSubmit(values: LessonSchemaType) {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				updateLesson(values, data?.id!)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}

	return (
		<div>
			<Link
				className={buttonVariants({
					variant: "outline",
					className: "mb-6",
				})}
				href={`/admin/courses/${courseId}/edit`}
			>
				<ArrowLeft className="size-4" />
				<span>Go back</span>
			</Link>
			<Card>
				<CardHeader>
					<CardTitle>
						Configure the video and description for this lesson
					</CardTitle>
				</CardHeader>
				<CardContent>
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
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<RichTextEditor field={field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="thumbnailKey"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thumbnail image</FormLabel>
										<FormControl>
											<Uploader
												onChange={field.onChange}
												fileTypeAccepted="image"
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="videoKey"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Video file</FormLabel>
										<FormControl>
											<Uploader
												onChange={field.onChange}
												value={field.value}
												fileTypeAccepted="video"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={pending} type="submit">
								{pending ? (
									<>
										<Loader2 className="size-4 animate-spin ml-1" />{" "}
										Saving...
									</>
								) : (
									"Save lesson"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

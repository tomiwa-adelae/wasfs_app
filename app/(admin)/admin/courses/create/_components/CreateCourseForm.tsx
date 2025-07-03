"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatMoneyInput, handleKeyDown } from "@/lib/utils";
import { useState, useTransition } from "react";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { Uploader } from "@/components/file-uploader/Uploader";
import { Loader } from "@/components/sidebar/Loader";
import { tryCatch } from "@/hooks/tryCatch";
import { useConfetti } from "@/hooks/useConfetti";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { createCourse } from "../actions";
import {
	courseCategories,
	courseLevels,
	courseSchema,
	CourseSchemaType,
	courseStatus,
} from "@/lib/zodSchema";
import { SparkleIcon } from "lucide-react";

export function CreateCourseForm() {
	const [pending, startTransition] = useTransition();
	const [price, setPrice] = useState("");

	const router = useRouter();

	const { triggerConfetti } = useConfetti();

	const form = useForm<CourseSchemaType>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			title: "",
			category: "Development",
			slug: "",
			description: "",
			smallDescription: "",
			level: "Beginner",
			status: "Draft",
			duration: 0,
			price: 0,
			fileKey: "",
		},
	});

	const handlePriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: any
	) => {
		let inputValue = e.target.value;

		// If the input starts with a "0" and is followed by another number, remove the "0"
		if (
			inputValue.startsWith("0") &&
			inputValue.length > 1 &&
			inputValue[1] !== "."
		) {
			inputValue = inputValue.slice(1);
		}

		// Prevent the input from starting with a period
		if (inputValue.startsWith(".")) {
			return;
		}

		inputValue = inputValue.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}

		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
			const formattedValue = formatMoneyInput(inputValue);
			setPrice(formattedValue);
			field.onChange(Number(inputValue));
		}
	};

	function onSubmit(data: CourseSchemaType) {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(createCourse(data));

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
				triggerConfetti();
				form.reset();
				router.push(`/admin/courses`);
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Course title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 items-end">
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="Slug" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="button"
						className="w-fit"
						onClick={() => {
							const titleValue = form.getValues("title");
							const slug = slugify(titleValue);
							form.setValue("slug", slug, {
								shouldValidate: true,
							});
						}}
					>
						Generate slug <SparkleIcon className="ml-1" size={16} />
					</Button>
				</div>
				<FormField
					control={form.control}
					name="smallDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Small description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about the course"
									className="resize-none"
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
					name="fileKey"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thumbnail image</FormLabel>
							<FormControl>
								<Uploader
									onChange={field.onChange}
									value={field.value}
									fileTypeAccepted="image"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{courseCategories.map((category) => (
											<SelectItem
												key={category}
												value={category}
											>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="level"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Level</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a level" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{courseLevels.map((level) => (
											<SelectItem
												key={level}
												value={level}
											>
												{level}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Duration</FormLabel>
								<FormControl>
									<Input
										placeholder="Course duration"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										placeholder="Price"
										onKeyDown={handleKeyDown}
										id="decimalInput"
										inputMode="decimal"
										value={price}
										onChange={(e) =>
											handlePriceChange(e, field)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{courseStatus.map((status) => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={pending}>
					{pending ? <Loader /> : <>Create course</>}
				</Button>
			</form>
		</Form>
	);
}

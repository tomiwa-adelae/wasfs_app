"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { tryCatch } from "@/hooks/tryCatch";
import { deleteCourse } from "../actions";

export const DeleteForm = ({ courseId }: { courseId: string }) => {
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	function onSubmit() {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				deleteCourse(courseId)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
				router.push(`/admin/courses`);
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}
	return (
		<div className="max-w-xl mx-auto w-full">
			<Card className="mt-32">
				<CardHeader>
					<CardTitle>
						Are you sure you want to delete this course?
					</CardTitle>
					<CardDescription>
						This action can not be undone
					</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center  justify-between">
					<Link
						className={buttonVariants({ variant: "outline" })}
						href={`/admin/courses`}
					>
						Cancel
					</Link>
					<Button
						variant={"destructive"}
						onClick={onSubmit}
						disabled={pending}
					>
						{pending ? (
							<>
								<Loader2 className="size-4 animate-spin ml-1" />{" "}
								Deleting...
							</>
						) : (
							<>Delete </>
						)}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

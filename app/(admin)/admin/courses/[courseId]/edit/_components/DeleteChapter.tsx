"use client";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/tryCatch";
import { deleteChapter } from "../actions";

export const DeleteChapter = ({
	chapterId,
	courseId,
}: {
	chapterId: string;
	courseId: string;
}) => {
	const [open, setOpen] = useState(false);

	const [pending, startTransition] = useTransition();

	async function onDelete() {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				deleteChapter({ courseId, chapterId })
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
				setOpen(false);
			} else {
				toast.error(result.message);
			}
		});
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<Trash2 className="size-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete this chapter.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={onDelete} disabled={pending}>
						{pending ? (
							<>
								<Loader2 className="animate-spin size-4" />
								Deleting...
							</>
						) : (
							"Delete"
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

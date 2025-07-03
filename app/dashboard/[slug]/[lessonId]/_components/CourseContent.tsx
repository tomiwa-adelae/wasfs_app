"use client";
import { LessonContentType } from "@/app/data/user/get-lesson-content";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookIcon, Check, CheckCircle, Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { markLessonComplete } from "../actions";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/useConfetti";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { tryCatch } from "@/hooks/tryCatch";

interface Props {
	data: LessonContentType;
}

export const CourseContent = ({ data }: Props) => {
	const [pending, startTransition] = useTransition();
	const { triggerConfetti } = useConfetti();

	function VideoPlayer({
		thumbnailKey,
		videoKey,
	}: {
		thumbnailKey: string;
		videoKey: string;
	}) {
		const videoUrl = useConstructUrl(videoKey);
		const thumbnailUrl = useConstructUrl(thumbnailKey);

		if (!videoKey) {
			return (
				<div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
					<BookIcon className="size-16 text-primary mx-auto mb-4" />
					<p className="text-muted-foreground ">
						This lesson does not have a video yet
					</p>
				</div>
			);
		}

		return (
			<div className="aspect-video bg-black rounded-lg relative overflow-hidden">
				<video
					className="size-full object-cover"
					controls
					poster={thumbnailUrl}
				>
					<source src={videoUrl} type="video/mp4" />
					<source src={videoUrl} type="video/webm" />
					<source src={videoUrl} type="video/ogg" />
					Your browser does not support the video tag
				</video>
			</div>
		);
	}

	function onSubmit() {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				markLessonComplete(data.id, data.Chapter.Course.slug)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			if (result.status === "success") {
				toast.success(result.message);
				triggerConfetti();
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}

	return (
		<div className="flex flex-col h-full bg-background pl-6">
			<VideoPlayer
				thumbnailKey={data.thumbnailKey ?? ""}
				videoKey={data.videoKey ?? ""}
			/>

			<div className="py-4 border-b">
				{data.lessonProgress.length > 0 ? (
					<Button
						variant={"outline"}
						className="bg-green-500/10 hover:text-green-600 text-green-600"
					>
						<CheckCircle className="size-4 mr-2 text-green-500" />
						Completed
					</Button>
				) : (
					<Button onClick={onSubmit} variant="outline">
						{pending ? (
							<>
								<Loader2 className="size-4 animate-spin ml-1" />{" "}
								Marking...
							</>
						) : (
							<>
								<Check className="size-4 mr-2 text-green-500" />
								Mark as complete
							</>
						)}
					</Button>
				)}
			</div>
			<div className="space-y-3 pt-3">
				<h1 className="text-3xl font-semibold tracking-tight text-foreground">
					{data.title}
				</h1>
				<p>
					{data.description && (
						<RenderDescription
							json={JSON.parse(data.description)}
						/>
					)}
				</p>
			</div>
		</div>
	);
};

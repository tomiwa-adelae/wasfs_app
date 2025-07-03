import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
	return (
		<div className="text-center">
			<div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted">
				<CloudUploadIcon
					className={cn(
						"size-6 text-muted-foreground ",
						isDragActive && "text-primary"
					)}
				/>
			</div>
			<p className="mt-4 text-base font-semibold text-muted-foreground">
				Drop your files here or{" "}
				<span className="text-primary font-bold cursor-pointer">
					click to upload
				</span>
			</p>
			<Button type="button" className="mt-4">
				Select file
			</Button>
		</div>
	);
};

const RenderErrorState = () => {
	return (
		<div className="text-center">
			<div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/60">
				<ImageIcon className={cn("size-6 text-destructive")} />
			</div>
			<p className="mt-4 text-base font-semibold">Upload failed</p>
			<p className="text-xs text-muted-foreground mt-1">
				Something went wrong
			</p>
			<Button type="button" className="mt-4">
				Retry upload
			</Button>
		</div>
	);
};

const RenderUploadedState = ({
	previewUrl,
	isDeleting,
	handleRemoval,
	fileType,
}: {
	fileType: "image" | "video";
	previewUrl: string;
	isDeleting: boolean;
	handleRemoval: () => void;
}) => {
	return (
		<div className="relative size-full flex items-center justify-center group">
			{fileType === "video" ? (
				<video
					src={previewUrl}
					controls
					className="rounded-md size-full"
				/>
			) : (
				<Image
					src={previewUrl}
					alt="Uploaded file"
					fill
					className="object-contain p-2"
				/>
			)}
			<Button
				variant="destructive"
				size="icon"
				className={cn("absolute top-4 right-4")}
				onClick={handleRemoval}
				disabled={isDeleting}
			>
				{isDeleting ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					<XIcon />
				)}
			</Button>
		</div>
	);
};

const RenderUploadingState = ({
	progress,
	file,
}: {
	progress: number;
	file: File;
}) => {
	return (
		<div className="text-center flex items-center justify-center flex-col">
			<p>{progress}%</p>
			<p className="mt-2 text-sm font-medium text-muted-foreground">
				Uploading...
			</p>
			<p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
				{file.name}
			</p>
		</div>
	);
};

export {
	RenderEmptyState,
	RenderErrorState,
	RenderUploadedState,
	RenderUploadingState,
};

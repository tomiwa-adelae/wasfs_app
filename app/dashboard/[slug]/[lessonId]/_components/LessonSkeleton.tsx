import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LessonSkeleton = () => {
	return (
		<div className="flex flex-col h-full pl-6">
			<div className="relative overflow-hidden aspect-video bg-muted rounded-lg">
				<Skeleton className="size-full" />
			</div>
			<div className="flex-1 space-y-6 mt-5">
				<div className="space-y-2">
					<Skeleton className="h-8 w-3/4" />
					<Skeleton className="h-8 w-1/2" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/6" />
				</div>
				<div className="flex gap-3">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-25" />
				</div>
			</div>
		</div>
	);
};

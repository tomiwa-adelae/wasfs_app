import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CreateCourseForm } from "./_components/CreateCourseForm";

const page = () => {
	return (
		<div>
			<div className="flex items-center gap-4 mb-8">
				<Button asChild variant="outline" size="icon">
					<Link href="/admin/courses">
						<ArrowLeft />
					</Link>
				</Button>
				<h1 className="text-2xl font-bold">Create new course</h1>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Basic information</CardTitle>
					<CardDescription>
						Provide basic information about the course
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CreateCourseForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default page;

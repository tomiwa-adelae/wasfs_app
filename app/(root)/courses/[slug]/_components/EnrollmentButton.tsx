"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { enrollInCourseAction, updateEnrolledCourse } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { tryCatch } from "@/hooks/tryCatch";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";

export const EnrollmentButton = ({
	courseId,
	price,
}: {
	courseId: string;
	price: number;
}) => {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const { data: session } = authClient.useSession();

	const config = {
		reference: new Date().getTime().toString(),
		email: session?.user.email,
		amount: Number(price) * 100, // Convert to kobo
		publicKey: env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		metadata: {
			name: `${session?.user.name}`,
			custom_fields: [
				{
					display_name: "Full Name",
					variable_name: "full_name",
					value: `${session?.user.name}`,
				},
			],
		},
	};

	const initializePayment = usePaystackPayment(config);

	function onSubmit() {
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				enrollInCourseAction(courseId)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again");
				return;
			}

			console.log(result);

			if (result.status === "success") {
				toast.success(result.message);
				initializePayment({
					onSuccess: async (reference: any) => {
						const { data: paymentResult, error } = await tryCatch(
							updateEnrolledCourse(courseId, "Active")
						);

						if (error) {
							toast.error(
								"An unexpected error occurred. Please try again"
							);
							return;
						}

						if (paymentResult.status === "success") {
							toast.success(
								"Course enrolled and payment successful. You would be redirected..."
							);
							router.push(`/payment/success`);
						} else if (paymentResult.status === "error") {
							toast.error(
								"Course enrolled but payment not successful.  You would be redirected..."
							);
							router.push("/payment/error");
						}
					},
					onClose: () => {
						console.log("error");
					},
				});
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}

	return (
		<Button className="w-full" onClick={onSubmit} disabled={pending}>
			{pending ? (
				<>
					<Loader2 className="size-4 animate-spin ml-1" /> Loading...
				</>
			) : (
				"Enroll now!"
			)}
		</Button>
	);
};

"use client";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader } from "@/components/sidebar/Loader";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const VerifyForm = () => {
	const params = useSearchParams();
	const email = params.get("email") as string;
	const [pending, startTransition] = useTransition();

	const onSubmit = () => {
		startTransition(async () => {});
	};

	return (
		<div>
			<Card className="gap-0 py-8">
				<CardHeader className="text-center mb-4">
					<CardTitle className="text-2xl">
						Please check your email
					</CardTitle>
					<CardDescription className="text-muted-foreground text-sm">
						We have sent a verification code to your email address{" "}
						<strong>{email}</strong>. Please open the email and
						paste the code below
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 w-full flex flex-col items-center justify-center">
					<InputOTP maxLength={6}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>

					<Button
						onClick={onSubmit}
						className="w-full"
						disabled={pending}
					>
						{pending ? (
							<Loader />
						) : (
							<>
								<IconMail className="size-4" /> Verify
							</>
						)}
					</Button>
				</CardContent>
			</Card>
			<p className="text-sm text-muted-foreground text-center mt-5">
				Don't have an account?{" "}
				<Link
					href="/register"
					className="font-medium hover:text-primary"
				>
					Sign up
				</Link>
			</p>
		</div>
	);
};

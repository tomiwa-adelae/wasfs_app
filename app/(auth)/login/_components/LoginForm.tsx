"use client";
import { Loader } from "@/components/sidebar/Loader";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
	IconBrandGoogle,
	IconEye,
	IconEyeClosed,
	IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
	const [googlePending, startGoogleTransition] = useTransition();
	const [emailPending, startEmailTransition] = useTransition();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const onSubmitGoogle = () => {
		startGoogleTransition(async () => {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/",
				fetchOptions: {
					onSuccess: () => {
						toast.success(
							"Signed in with Google, you will be redirected...."
						);
					},
					onError: () => {
						toast.error("Internal server error.");
					},
				},
			});
		});
	};

	const onSubmitEmail = () => {
		if (!email) {
			toast.error("Please enter your email");
			return;
		}
		if (!password) {
			toast.error("Please enter your password");
			return;
		}
		startEmailTransition(async () => {
			await authClient.signIn.email({
				email,
				password,
				callbackURL: "/",
				fetchOptions: {
					onSuccess: () => {
						toast.error(
							"You have been successfully authenticated. You will be redirected..."
						);
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				},
			});
		});
	};

	return (
		<div>
			<Card className="gap-0 py-8">
				<CardHeader className="text-center mb-4">
					<CardTitle className="text-2xl">
						Welcome back to WASFS
					</CardTitle>
					<CardDescription className="text-muted-foreground text-sm">
						Login with your email
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 w-full">
					<Button
						onClick={onSubmitGoogle}
						className="w-full"
						variant={"outline"}
					>
						{googlePending ? (
							<Loader />
						) : (
							<>
								<IconBrandGoogle className="size-4" /> Sign in
								with Google
							</>
						)}
					</Button>
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
					<div className="space-y-3">
						<Label htmlFor="email">Email</Label>
						<Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
							placeholder="Email"
						/>
					</div>
					<div className="space-y-3">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="*********"
							/>
							<Button
								onClick={() => setShowPassword(!showPassword)}
								size="icon"
								variant="ghost"
								className="absolute top-[50%] right-0 translate-y-[-50%] text-muted-foreground"
							>
								{showPassword ? (
									<IconEye className="size-4" />
								) : (
									<IconEyeClosed className="size-4" />
								)}
							</Button>
						</div>
					</div>

					<Link
						href="/forgot-password"
						className="inline-block font-medium hover:text-primary text-sm text-muted-foreground"
					>
						Forgot password?{" "}
					</Link>
					<Button
						onClick={onSubmitEmail}
						className="w-full"
						disabled={emailPending}
					>
						{emailPending ? (
							<Loader />
						) : (
							<>
								<IconMail className="size-4" /> Continue
							</>
						)}
					</Button>
				</CardContent>
			</Card>
			<p className="text-sm text-muted-foreground text-center mt-5">
				Don&apos;t have an account?{" "}
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

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignout = () => {
	const router = useRouter();

	const handleSignout = async function signout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
					toast.success("Signed out successfully!");
				},
				onError: () => {
					toast.error("Failed to sign out");
				},
			},
		});
	};

	return handleSignout;
};

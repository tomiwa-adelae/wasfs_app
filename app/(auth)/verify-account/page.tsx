import React, { Suspense } from "react";
import { VerifyForm } from "./_components/VerifyForm";

const page = () => {
	return (
		<Suspense>
			<VerifyForm />
		</Suspense>
	);
};

export default page;

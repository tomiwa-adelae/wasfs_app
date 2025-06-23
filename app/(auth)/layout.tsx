import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import Image from "next/image";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<div className="pt-20 flex items-center justify-center">
				<div className="grid w-full grid-cols-1 md:grid-cols-2">
					<Image
						src={"/assets/images/auth-img.jpg"}
						alt={"Auth image"}
						width={1000}
						height={1000}
						className="hidden md:block size-full max-h-[100vh] object-cover "
					/>
					<div className="py-10 container flex items-center justify-center">
						{children}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

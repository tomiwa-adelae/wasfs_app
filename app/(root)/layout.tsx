import { Header } from "./_components/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<div className="pt-20">{children}</div>
		</div>
	);
}

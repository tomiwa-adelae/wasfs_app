import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "West African School of Forensic Studies | Accredited Forensic Training & Certifications",
	description:
		"Join the West African School of Forensic Studies (WASFS) for accredited forensic auditing, criminal investigations, and digital forensics training. 100% online, globally recognized certifications",
	keywords:
		"forensic studies, forensic training, digital forensics certification, fraud auditing courses, forensic science school, criminal investigations training, IICFIP certification, cybercrime investigation, forensic accounting diploma, wasfs, prof akinteye ademola, ademola, akinteye, simon akinteye",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}

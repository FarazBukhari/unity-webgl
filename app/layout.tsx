import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Unity WebGL",
	description: "Foxy Sama Unity WebGl Loader",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='bg-slate-800'>{children}</body>
		</html>
	);
}

"use client";

import "@/components/styles/globals.scss";
import * as React from "react";
import { Providers } from "./providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

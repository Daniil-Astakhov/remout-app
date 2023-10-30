"use client";

import { NextUIProvider } from "@nextui-org/react";
import { StoreProvider } from "@/components/providers/StoreProvider";

export function Providers({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<StoreProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</StoreProvider>
	);
}

"use client";

export default function ChoiceLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<main className="flex h-[100vh] justify-center items-center">
			{children}
		</main>
	);
}

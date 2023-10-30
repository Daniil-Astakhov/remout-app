import React from "react";

import { Input } from "@nextui-org/input";

export const InputUi: React.FC = () => {
	return (
		<div className="flex w-50 flex-wrap md:flex-nowrap gap-4">
			<Input
				classNames={{
					label: "text-black/50 dark:text-white/90",
					input: [
						"bg-transparent",
						"text-black/90 dark:text-white/90",
						"placeholder:text-default-700/50 dark:placeholder:text-white/60",
					],
					innerWrapper: "bg-transparent",
					inputWrapper: [
						"shadow-xl",
						"bg-default-200/50",
						"dark:bg-default/60",
						"backdrop-blur-xl",
						"backdrop-saturate-200",
						"hover:bg-default-200/70",
						"dark:hover:bg-default/70",
						"group-data-[focused=true]:bg-default-200/50",
						"dark:group-data-[focused=true]:bg-default/60",
						"!cursor-text",
					],
				}}
				type="email"
				label="Номер заказа"
			/>
		</div>
	);
};

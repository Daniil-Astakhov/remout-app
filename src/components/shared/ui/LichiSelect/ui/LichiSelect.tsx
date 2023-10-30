import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";

interface SelectProps {
	key: string;
	src?: string;
}

interface LichiSelectProps {
	onChange?: (value: string) => void;
	items?: SelectProps[];
	avatar?: boolean;
	defaultValue?: string | null | undefined;
	label?: string | undefined;
	defaultSelect?: string;
	avatarSrc?: string;
	noValue?: string | null;
	height?: string | null;
}

export const LichiSelect: FC<LichiSelectProps> = ({
	onChange = () => {
		return null;
	},
	items = [
		{ key: "1", src: "1" },
		{ key: "2", src: "2" },
	],
	avatar = false,
	defaultValue = null,
	label = null,
	defaultSelect = null,
	avatarSrc = "",
	noValue = null,
	height = "100%",
}) => {
	const [value, setValue] = useState<string>("");

	const getValue = (e: ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		onChange(value);
	}, [value]);

	const itemsRegion = () => {
		const base: React.JSX.Element | null = defaultValue ? (
			<SelectItem
				key="All"
				className="text-[black]"
				startContent={
					avatar ? (
						<Avatar
							alt={defaultValue}
							className="w-6 h-6 text-[black]"
							src={`https://flagcdn.com/${avatarSrc}.svg`}
						/>
					) : (
						<Avatar alt={defaultValue} className="hidden" />
					)
				}
			>
				{defaultValue}
			</SelectItem>
		) : null;
		const itemsMap = items?.map((item: SelectProps) => {
			return (
				<SelectItem
					id="1"
					key={item.key}
					className="text-[black]"
					startContent={
						avatar ? (
							<Avatar
								alt={item?.key}
								className="w-6 h-6"
								src={`https://flagcdn.com/${item?.src}.svg`}
							/>
						) : (
							<Avatar alt={item?.key} className="hidden" />
						)
					}
				>
					{item?.key || noValue}
				</SelectItem>
			);
		});
		if (base) itemsMap.push(base);
		return itemsMap;
	};

	return (
		<Select
			defaultSelectedKeys={defaultSelect ? [`${defaultSelect}`] : []}
			onChange={getValue}
			className="w-full text-[black] "
			label={label}
			variant="bordered"
			classNames={{
				mainWrapper: `h-[${height}]  `,
				base: "rounded-none",
				trigger: `h-[${height}]`,
				value: "text-[13px]  text-black bottom-[5px]",
			}}
			size="sm"
		>
			{itemsRegion()}
		</Select>
	);
};

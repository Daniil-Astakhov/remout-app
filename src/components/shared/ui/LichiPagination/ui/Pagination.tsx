import { Pagination } from "@nextui-org/react";
import { useEffect, useState, FC } from "react";
import { motion } from "framer-motion";
import { animationOpacity } from "@/components/styles/motion/animation";

interface PagProps {
	onChange: (value: string | number | null) => void;
	total?: number | undefined;
	classNames?: string | undefined;
}

export const LichiPagination: FC<PagProps> = ({
	onChange,
	total = 1,
	classNames = "",
}): JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		if (currentPage) onChange(currentPage);
	}, [currentPage]);

	return (
		<motion.div
			{...animationOpacity}
			transition={{ duration: 0.4 }}
			className={`flex flex-col gap-5 h-auto ${classNames}`}
		>
			<Pagination
				total={total === 0 ? 1 : total}
				isCompact
				initialPage={1}
				color="primary"
				page={currentPage}
				showControls
				onChange={setCurrentPage}
				size="sm"
			/>
		</motion.div>
	);
};

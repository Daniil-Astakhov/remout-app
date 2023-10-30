"use client";

import { motion } from "framer-motion";
import { animationOpacity } from "@/components/styles/motion/animation";
import { AllCardsTable } from "@/components/widgets/AllCardsTable";
import styles from "./TablePage.module.scss";

export default function Table(): JSX.Element {
	return (
		<motion.section
			className={styles.section}
			{...animationOpacity}
			transition={{ duration: 0.4 }}
		>
			<div className={styles.tableWrap}>
				<AllCardsTable />
			</div>
		</motion.section>
	);
}

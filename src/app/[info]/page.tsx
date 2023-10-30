"use client";

import { motion } from "framer-motion";
import { animationOpacity } from "@/components/styles/motion/animation";
import HistoryTable from "@/components/features/HistoryTable/ui/HistoryTable";
import { CurrentCard } from "@/components/widgets/CurrentBarcodeCardTable";
import styles from "./CardPage.module.scss";

export default function Card(): JSX.Element {
	return (
		<motion.section
			{...animationOpacity}
			transition={{ duration: 0.4 }}
			className={styles.section}
		>
			<div className={styles.cardWrap}>
				<CurrentCard />
			</div>
			<div className={styles.historyWrap}>
				<HistoryTable />
			</div>
		</motion.section>
	);
}

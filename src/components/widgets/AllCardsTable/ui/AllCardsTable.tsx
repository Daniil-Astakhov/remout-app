"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { animationOpacity } from "@/components/styles/motion/animation";
import { MainTable } from "@/components/features/MainTable";
import { LichiSelect } from "@/components/shared/ui/LichiSelect";
import { getRegionsList } from "@/components/entities/RegionsData";
import LichiInput from "@/components/shared/ui/LichiInput/LichiInput";
import { mainTableActions } from "@/components/entities/MainTableData";
import { LichiModal } from "@/components/shared/ui/LichiModal/LichiModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { LichiPagination } from "@/components/shared/ui/LichiPagination/ui/Pagination";
import { getPaginationMainTable } from "@/components/entities/MainTableData/model/selectors/mainTableSelectors";
import FormManualCard from "../../FormManualCard/ui/FormManuCard";
import { SelectProps } from "../model/types/allCardsTypes";
import styles from "./AllCardsTable.module.scss";
import { getStatus } from "../../FormManualCard/model/selectors/formManuCardSelectors";
import { manualFormActions } from "../../FormManualCard/model/slice/formManuCardSlice";

const AllCardsTable = (): JSX.Element => {
	const [region, setRegion] = useState<string>("All");
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [searchValue, setSerchValue] = useState<string | null>("");
	const [pag, setPag] = useState<string | number | null | undefined>(1);

	const regions = useSelector(getRegionsList);
	const status = useSelector(getStatus);
	const pagination = useSelector(getPaginationMainTable);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (searchValue) {
			dispatch(mainTableActions.setSearchValue(searchValue));
		} else {
			dispatch(mainTableActions.setSearchValue(""));
		}
		if (pag) dispatch(mainTableActions.setPagValue(pag));

		if (region) dispatch(mainTableActions.setRegionValue(region));
	}, [pag, searchValue, region]);

	useEffect(() => {
		if (status === 200) setModalOpen(false);
	}, [status]);

	useEffect(() => {
		if (!modalOpen) dispatch(manualFormActions.setSuccess(0));
	}, [modalOpen]);

	useEffect(() => {
		setRegion("All");
	}, []);

	const getValue = (value: string | null) => {
		setSerchValue(value);
	};

	const getPag = (value: string | number | null) => {
		setPag(value);
	};

	const getSelect = (value: string) => {
		if (value.trim() !== "") {
			setRegion(value);
		} else {
			setRegion("null");
		}
	};

	const getFlag = (value: boolean) => {
		setModalOpen(value);
	};

	const selectItems = regions.map((item: SelectProps) => {
		return { key: item.code, src: item.code.toLowerCase() };
	});

	return (
		<div className={styles.tableWrap}>
			<div className={styles.header}>
				<LichiModal
					open={modalOpen}
					onChange={getFlag}
					contents={{
						header: (
							<div className="text-[#000000d0] flex justify-center items-center">
								Начисление бонусов в регион: {region}
							</div>
						),
						body: (
							<div>
								<FormManualCard region={region} />
							</div>
						),
						footer: null,
					}}
				/>
				<div className={styles.select}>
					<LichiSelect
						onChange={getSelect}
						items={selectItems}
						defaultValue="All"
						defaultSelect="All"
						avatar
						avatarSrc="tk"
						label="Регион"
						height="56px"
					/>
				</div>

				<LichiInput
					label="Поиск по полям"
					onChange={getValue}
					debounce={1000}
					classes={["h-[56px]  w-[230px]"]}
				/>
				<Button
					className={styles.headerBtn}
					disabled={false}
					onClick={() => setModalOpen(true)}
					isLoading={region === "All" || region === "null"}
					radius="sm"
				>
					{region === "All" || region === "null" ? "Регион" : "Начислить"}
				</Button>
			</div>
			<motion.div
				{...animationOpacity}
				transition={{ duration: 0.5 }}
				className="max-h-[70%] h-[618px] "
			>
				<MainTable />
				<div className={styles.pagWrap}>
					<div className={styles.pagItem}>
						{pagination?.last && (
							<LichiPagination onChange={getPag} total={pagination?.last} />
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default AllCardsTable;

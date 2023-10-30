import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Pagination,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { getUser, getUserData } from "@/components/entities/User";
import { getHistoryTable } from "@/components/entities/HistoryTableData";
import { LichiModal } from "@/components/shared/ui/LichiModal/LichiModal";
import {
	itemProductModalProp,
	productModalProp,
} from "../model/types/mainTableTypes";

const columns = [
	{ name: "DATE", uid: "date" },
	{ name: "ID", uid: "id" },
	{ name: "BONUS", uid: "bonus" },
	{ name: "SUM", uid: "sum" },
	{ name: "REASON", uid: "reason" },
];

const HistoryTable: React.FC = memo(() => {
	const [tableArr, setTableArr] = useState([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [productModal, setproductModal] = useState<
		productModalProp | undefined
	>();
	const [bodyModal, setBodyModal] = useState<any>();
	const dispatch = useAppDispatch();
	const { info } = useParams();
	// const loading = useSelector(getGlobalSpin);
	const table = useSelector(getHistoryTable);
	const userData = useSelector(getUserData);

	useEffect(() => {
		dispatch(getUser({ phone: info }));
	}, []);

	// useEffect(() => {
	// 	if (userData.card)
	// 		dispatch(getHistoryList({ barcode: userData.card.barcode }));
	// }, [userData]);

	const parsTable = (tableProp: any): any => {
		const tableObj: any = [];
		if (tableProp) {
			tableProp.forEach((item: any) => {
				const confirmItems = {
					id: item.id,
					bonus: item.bonus,
					date: item.valid_at,
					sum: item.sum,
					reason: item.reason,
					data: item.data,
				};

				tableObj.push({
					row: confirmItems,
				});
			});
		}

		return tableObj;
	};
	const [page, setPage] = useState(1);
	const rowsPerPage = 8;

	const pages = Math.ceil(tableArr.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return tableArr.slice(start, end);
	}, [page, tableArr]);

	useEffect(() => {
		if (table) setTableArr(parsTable(table));
	}, [table, userData]);

	const getFlag = (value: boolean) => {
		setModalOpen(value);
	};

	const handleRowClick = (item: any) => {
		setproductModal(item);
		setModalOpen(true);
	};

	useEffect(() => {
		if (productModal?.reason === "realization") {
			setBodyModal(
				<div className="flex gap-4 flex-col">
					<div className="flex justify-around gap-4">
						<span>
							Дата создания: {productModal?.data.created_at ?? "Нет даты"}
						</span>
						<span>
							Реализация: {productModal?.data.realization_id ?? "Нет номера"}
						</span>
					</div>
					{productModal?.data.products?.map(
						(item: itemProductModalProp, key: number) => {
							return (
								<div key={key} className="flex gap-4">
									<span>Артикль: {item?.article ?? "No Info"}</span>
									<span>Продукт: {item?.product ?? "No Info"}</span>
									<span>Скидка: {item?.discount ?? "No Info"}</span>
									<span>Цена: {item?.price ?? "No Info"}</span>
									<span>Количество: {item?.quantity ?? "No Info"}</span>
									<span>Размер: {item?.size ?? "No Info"}</span>
									<span>
										Использовано бонусов: {item?.use_bonuses ?? "No Info"}
									</span>
								</div>
							);
						}
					)}
				</div>
			);
		}
		if (productModal?.reason === "up") {
			setBodyModal(
				<div className="flex gap-4 flex-col ">
					<div className="flex justify-around gap-4">
						<span>Дата создания: {productModal?.date ?? "Нет даты"}</span>
						<span>Тип: {productModal?.reason ?? "Нет номера"}</span>
					</div>

					<div className="flex gap-4">
						<span>sum: {productModal?.sum ?? "No Info"}</span>
						<span>bonus: {productModal?.bonus ?? "No Info"}</span>

						<span>state: {productModal?.data.state ?? "No Info"}</span>
						<span>status_id: {productModal?.data.status_id ?? "No Info"}</span>
						<span>sum: {productModal?.sum ?? "No Info"}</span>
					</div>
				</div>
			);
		}
		if (productModal?.reason === "manual") {
			setBodyModal(
				<div className="flex gap-4 flex-col ">
					<div className="flex justify-around gap-4">
						<span>Дата создания: {productModal?.date ?? "Нет даты"}</span>
						<span>Тип: {productModal?.reason ?? "Нет номера"}</span>
					</div>

					<div className="flex gap-4">
						<span>author: {productModal?.data.author ?? "No Info"}</span>
						<span>bonus: {productModal?.data.bonus ?? "No Info"}</span>
						<span>comment: {productModal?.data.comment ?? "No Info"}</span>
						<span>Истекает: {productModal?.data.expire_date ?? "No Info"}</span>
						<span>
							is_expiring: {productModal?.data.is_expiring ?? "No Info"}
						</span>
						<span>sum: {productModal?.data.sum ?? "No Info"}</span>
					</div>
				</div>
			);
		}
	}, [productModal]);

	const renderCell = useCallback((user: any, columnKey: any) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "id":
				return (
					<p className="text-bold flex justify-center items-start text-sm capitalize text-default-400">
						{user.id}
					</p>
				);
			case "bonus":
				return (
					<p className="text-bold text-sm capitalize text-default-400">
						{user.bonus}
					</p>
				);
			case "date":
				return (
					<p className="text-bold text-sm capitalize text-default-400">
						{user.date}
					</p>
				);
			case "sum":
				return (
					<p className="text-bold text-sm capitalize text-default-400">
						{user.sum}
					</p>
				);
			case "reason":
				return (
					<p className="text-bold text-sm capitalize text-default-400">
						{user.reason}
					</p>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<div className=" flex flex-col h-full w-full w-max-[1200px] items-start justify-center">
			<LichiModal
				open={modalOpen}
				onChange={getFlag}
				isDismissable={false}
				contents={{
					header: <div>{productModal?.invoice ?? "Нет номера инвойса"}</div>,
					body: <div>{bodyModal}</div>,
					footer: <div />,
				}}
			/>
			<Table
				classNames={{
					wrapper: ["min-h-[365px]", "max-w-[1200px]"],
				}}
				aria-label="Example table with custom cells"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={items}>
					{(item: any) => (
						<TableRow
							className="cursor-[pointer] duration-[200ms]  delay-0 hover:bg-[#00000033] "
							key={item.row.id}
							onClick={() => handleRowClick(item.row)}
						>
							{(columnKey) => (
								<TableCell>{renderCell(item.row, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex w-full justify-center">
				<Pagination
					isCompact
					showControls
					showShadow
					color="secondary"
					page={page}
					total={pages}
					onChange={(num: number) => setPage(num)}
				/>
			</div>
		</div>
	);
});

export default HistoryTable;

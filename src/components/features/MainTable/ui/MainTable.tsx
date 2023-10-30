import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	button,
} from "@nextui-org/react";

import { getRegionsArr } from "@/components/entities/RegionsData/model/actions/regionsAction";
import { getMainTable } from "@/components/entities/MainTableData";
import { getCardsList } from "@/components/entities/MainTableData/model/actions/mainTableAction";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { selectedUserActions } from "@/components/entities/SelectedUser";
import {
	getPagMainTable,
	getRegionValue,
	getSearchMainTable,
} from "@/components/entities/MainTableData/model/selectors/mainTableSelectors";

const columns = [
	{ name: "NAME", uid: "name" },
	{ name: "PHONE", uid: "phone" },
	{ name: "MAIL", uid: "email" },
	{ name: "BARCODE", uid: "barcode" },
	{ name: "REGION", uid: "region" },
	{ name: "TYPE", uid: "type" },
];

const MainTable: React.FC = memo(() => {
	const [tableArr, setTableArr] = useState([]);

	const table = useSelector(getMainTable);
	const pag = useSelector(getPagMainTable);
	const region = useSelector(getRegionValue);
	const searchValueData = useSelector(getSearchMainTable);

	const route = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getRegionsArr());
		dispatch(
			getCardsList({
				total: 10,
				page: pag,
				query: searchValueData,
				region: region.toLowerCase(),
			})
		);
	}, [searchValueData, button, pag, region]);

	useEffect(() => {
		if (table) setTableArr(parsTable(table));
	}, [region, table]);

	const parsTable = (tableProp: any): any => {
		const tableObj: any = [];

		if (tableProp.list) {
			tableProp.list.forEach((item: any) => {
				const confirmItems = {
					id: item.id,
					email: item.u_email,
					name: `${item.u_firstname ? item.u_firstname : ""} ${
						item.u_middlename ? item.u_middlename : ""
					} ${item.u_lastname ? item.u_lastname : ""}`,
					cards: item.cards.map((itemCard: any) => {
						return {
							barcode: itemCard.barcode,
							region: itemCard.region,
							type: itemCard.type,
						};
					}),
					phone: item.u_phone,
				};

				tableObj.push({
					row: confirmItems,
				});
			});
		}

		return tableObj;
	};

	const handleRowClick = useCallback((item: any) => {
		dispatch(selectedUserActions.setSelected(item.row.cards));
		route.push(`/${item.row.phone}`, { scroll: false });
	}, []);

	const renderCell = useCallback((user: any, columnKey: any) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<p className="text-normal text-[15px] text-[#000000cb]  capitalize  md:w-[200px]">
						{user.name}
					</p>
				);
			case "region":
				return (
					<div>
						{user.cards.map((item: any, key: number) => (
							<p
								id="autoTest"
								className="text-normal text-[#000000cb]  text-sm capitalize "
								key={key}
							>
								{item.region}
							</p>
						))}
					</div>
				);
			case "phone":
				return (
					<p className="text-normal text-sm capitalize text-[#000000cb] ">
						{user.phone}
					</p>
				);
			case "email":
				return (
					<p className="text-normal text-sm capitalize text-[#000000cb] ">
						{user.email}
					</p>
				);
			case "barcode":
				return (
					<div className="text-normal text-sm capitalize text-[#000000cb] ">
						{user.cards.map((item: any, key: number) => (
							<div key={key}>{item.barcode}</div>
						))}
					</div>
				);
			case "type":
				return (
					<div className="text-normal text-sm capitalize text-[#000000cb] ">
						{user.cards.map((item: any, key: number) => (
							<p key={key}>{item.type}</p>
						))}
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table
			classNames={{
				base: [["w-full", "max-h-[95%]", "pb-[40px]"]],
				wrapper: [
					" max-w-[1200px]",
					"h-[595px]",
					"max-h-[80%]",
					"p-0",
					"rounded-[8px]",
				],
				th: ["w-[200px] text-center"],
				td: ["w-[200px] text-center"],
				thead: ["rounded-none"],
			}}
			aria-label="Example table with custom cells"
		>
			<TableHeader className="pb-[10px] " columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={tableArr}>
				{(item: any) => (
					<TableRow
						key={item.row.phone}
						className="duration-[50ms]  delay-0 hover:bg-[#7eb6f69a] cursor-[pointer] h-[50px] border-b border-b-[#03020213]"
						onClick={() => handleRowClick(item)}
					>
						{(columnKey) => (
							<TableCell>{renderCell(item.row, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
});

export default MainTable;

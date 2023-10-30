import { StateSchema } from "@/components/providers/StoreProvider";

export const getHistoryTable = (state: StateSchema): any =>
	state.historyTable.table;

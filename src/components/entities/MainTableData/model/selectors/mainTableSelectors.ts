import { StateSchema } from "@/components/providers/StoreProvider";

export const getMainTable = (state: StateSchema): any => state.mainTable.table;

export const getPaginationMainTable = (state: StateSchema): any =>
	state.mainTable.pagination;

export const getSearchMainTable = (state: StateSchema): any =>
	state.mainTable.searchValue;

export const getPagMainTable = (state: StateSchema): any => state.mainTable.pag;

export const getRegionValue = (state: StateSchema): any =>
	state.mainTable.region;

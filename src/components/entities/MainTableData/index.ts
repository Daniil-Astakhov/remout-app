import {
	mainTableActions,
	mainTableReducer,
} from "./model/slice/mainTableSlice";
import {
	getMainTable,
	getRegionValue,
} from "./model/selectors/mainTableSelectors";
import type { TableSchema, TableType } from "./model/types/mainTableTypes";

export {
	mainTableActions,
	mainTableReducer,

	// actions

	// selectors
	getMainTable,
	getRegionValue,

	// types
	TableType,
	TableSchema,
};

import {
	historyTableActions,
	historyTableReducer,
} from "./model/slice/HistoryTableSlice";
import { getHistoryList } from "./model/actions/HistoryTableAction";
import { getHistoryTable } from "./model/selectors/historyTableSelectors";
import type { HistorySchema, HistoryType } from "./model/types/mainTableTypes";

export {
	historyTableActions,
	historyTableReducer,

	// actions
	getHistoryList,
	// selectors
	getHistoryTable,

	// types
	HistoryType,
	HistorySchema,
};

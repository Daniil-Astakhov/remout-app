import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getHistoryList } from "../actions/HistoryTableAction";
import type { HistorySchema, HistoryType } from "../types/mainTableTypes";

const initialState: HistorySchema = {
	table: [],
	success: [],
	error: [],
};

export const historyTableSlice = createSlice({
	name: "historyTable",
	initialState,
	reducers: {
		setHistoryTable: (state, action: PayloadAction<[]>) => {
			state.table = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getHistoryList.pending, (state) => {
				state.success = [];
				state.error = [];
			})
			.addCase(
				getHistoryList.fulfilled,
				(state, action: PayloadAction<HistoryType>) => {
					state.table = action.payload;
				}
			)
			.addCase(getHistoryList.rejected, (state, action) => {
				if (action.payload) {
					state.error = [action.payload];
				}
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: historyTableActions } = historyTableSlice;
export const { reducer: historyTableReducer } = historyTableSlice;

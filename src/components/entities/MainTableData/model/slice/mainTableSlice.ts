import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TableSchema, TableType } from "../types/mainTableTypes";
import { getCardsList } from "../actions/mainTableAction";

const initialState: TableSchema = {
	table: [],
	searchValue: "",
	pag: 1,
	pagination: [],
	region: "",
	success: [],
	error: [],
};

export const mainTableSlice = createSlice({
	name: "mainTable",
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string | number>) => {
			state.searchValue = action.payload;
		},
		setPagValue: (state, action: PayloadAction<string | number>) => {
			state.pag = action.payload;
		},
		setRegionValue: (state, action: PayloadAction<string>) => {
			state.region = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCardsList.pending, (state) => {
				state.success = [];
				state.error = [];
			})
			.addCase(
				getCardsList.fulfilled,
				(state, action: PayloadAction<TableType>) => {
					state.table = action.payload;
					state.pagination = action.payload.pagination;
				}
			)
			.addCase(getCardsList.rejected, (state, action) => {
				if (action.payload) {
					state.error = [action.payload];
				}
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: mainTableActions } = mainTableSlice;
export const { reducer: mainTableReducer } = mainTableSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RegionsSchema, RegionsType } from "../types/regionsTypes";
import { getRegionsArr } from "../actions/regionsAction";

const initialState: RegionsSchema = {
	region: [],
	success: [],
	error: [],
};

export const regionsSlice = createSlice({
	name: "regions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRegionsArr.pending, (state) => {
				state.success = [];
				state.error = [];
			})
			.addCase(
				getRegionsArr.fulfilled,
				(state, action: PayloadAction<RegionsType>) => {
					state.region = action.payload;
				}
			)
			.addCase(getRegionsArr.rejected, (state, action) => {
				if (action.payload) {
					state.error = [action.payload];
				}
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: regionsActions } = regionsSlice;
export const { reducer: regionsReducer } = regionsSlice;

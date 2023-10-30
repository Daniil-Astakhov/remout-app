import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpinGlobalSchema } from "../types/spinGlobalTypes";

const initialState: SpinGlobalSchema = {
	isActive: false,
};

export const spinGlobalSlice = createSlice({
	name: "spinGlobal",
	initialState,
	reducers: {
		setIsActive: (state, action: PayloadAction<boolean>) => {
			state.isActive = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { actions: spinGlobalActions } = spinGlobalSlice;
export const { reducer: spinGlobalReducer } = spinGlobalSlice;

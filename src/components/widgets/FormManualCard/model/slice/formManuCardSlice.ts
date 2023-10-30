/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { manualCard } from "../actions/formManuCardActions";

interface manualForm {
	success: number;
	error: string;
	isSuccess: boolean;
}

const initialState: manualForm = {
	success: 0,
	error: "",
	isSuccess: false,
};

export const manualFormSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setSuccess: (state, action: PayloadAction<number>) => {
			state.success = action.payload;
		},
	},
	extraReducers: () => {
		// builder
		// 	.addCase(manualCard.pending, (state) => {
		// 		state.success = 0;
		// 		state.error = "";
		// 	})
		// 	.addCase(manualCard.fulfilled, (state, action) => {
		// 		// eslint-disable-next-line no-console
		// 	})
		// 	.addCase(manualCard.rejected, (state, action) => {
		// 		if (action.payload) state.error = action.payload;
		// 	});
	},
});

// Action creators are generated for each case reducer function
export const { actions: manualFormActions } = manualFormSlice;
export const { reducer: manualFormReducer } = manualFormSlice;

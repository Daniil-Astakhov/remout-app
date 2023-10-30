import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SelectedSchema } from "../types/selectedUserTypes";

const initialState: SelectedSchema = {
	selected: "",
	success: [],
	error: [],
};

export const selectedUserSlice = createSlice({
	name: "selectedUser",
	initialState,
	reducers: {
		setSelected: (state, action: PayloadAction<string | string[]>) => {
			state.selected = action.payload;
		},
	},
	extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const { actions: selectedUserActions } = selectedUserSlice;
export const { reducer: selectedUserReducer } = selectedUserSlice;

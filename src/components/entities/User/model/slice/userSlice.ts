import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserSchema, UserType } from "../types/userTypes";
import { getUser } from "../actions/userActionPhone";
import { getUserBarcode } from "../actions/userActionBarcode";

const initialState: UserSchema = {
	user: [],
	cards: [],
	success: [],
	error: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<[]>) => {
			state.user = action.payload;
		},
		setUserCards: (state, action: PayloadAction<[]>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.success = [];
				state.error = [];
			})
			.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				if (action.payload) {
					state.error = [action.payload];
				}
			})
			.addCase(getUserBarcode.pending, (state) => {
				state.success = [];
				state.error = [];
			})
			.addCase(
				getUserBarcode.fulfilled,
				(state, action: PayloadAction<UserType>) => {
					state.cards = action.payload;
				}
			)
			.addCase(getUserBarcode.rejected, (state, action) => {
				if (action.payload) {
					state.error = [action.payload];
				}
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

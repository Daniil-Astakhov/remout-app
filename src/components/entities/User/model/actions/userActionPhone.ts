/* eslint-disable no-console */

import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk<any, any, ThunkConfig<string>>(
	"userAction",
	async (inited, thunkApi) => {
		const { extra, dispatch, rejectWithValue } = thunkApi;
		const { phone } = inited;

		try {
			dispatch(spinGlobalActions.setIsActive(true));
			const response = await extra.api.get<any>(
				`/card?phone=${phone.replace("+", "")}`
			);
			if (!response.data) {
				throw new Error();
			}
			return response.data;
		} catch (e) {
			return rejectWithValue("Произошла ошибка на сервере!");
		} finally {
			dispatch(spinGlobalActions.setIsActive(false));
		}
	}
);

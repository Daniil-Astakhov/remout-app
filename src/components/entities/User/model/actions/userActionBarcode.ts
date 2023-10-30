/* eslint-disable no-console */

import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserBarcode = createAsyncThunk<any, any, ThunkConfig<string>>(
	"userActionBarcode",
	async (inited, thunkApi) => {
		const { extra, dispatch, rejectWithValue } = thunkApi;
		const { barcode = 33333333333333 } = inited;

		try {
			dispatch(spinGlobalActions.setIsActive(true));
			const response = await extra.api.get<any>(`/card?barcode=${barcode}`);
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";

export const getRegionsArr = createAsyncThunk<any, void, ThunkConfig<string>>(
	"regionsAction",
	async (inited, thunkApi) => {
		const { extra, dispatch, rejectWithValue } = thunkApi;

		try {
			dispatch(spinGlobalActions.setIsActive(true));
			const response = await extra.api.get<any>("card/regions");
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";

interface GetHistoryListProps {
	barcode?: string;
}

export const getHistoryList = createAsyncThunk<
	any,
	GetHistoryListProps,
	ThunkConfig<string>
>("mainHistoryAction", async (inited, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	const { barcode } = inited;

	try {
		dispatch(spinGlobalActions.setIsActive(true));
		const response = await extra.api.get<any>(`/card/history/${barcode}`);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		return rejectWithValue("Произошла ошибка на сервере!");
	} finally {
		dispatch(spinGlobalActions.setIsActive(false));
	}
});

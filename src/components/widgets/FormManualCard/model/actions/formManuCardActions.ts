import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";

import { manualFormActions } from "../slice/formManuCardSlice";

interface ManualProps {
	barcode: string;
	bonus: string;
	sum: string;
	valid_at: string;
	is_expiring: string;
	expire_date: string;
	author: string;
	comment: string;
}

interface ManualResult {
	errors?: string;
	success: string;
	message: string;
}

export const manualCard = createAsyncThunk<
	ManualResult,
	ManualProps,
	ThunkConfig<string>
>("manualCard", async (authData, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;

	try {
		dispatch(spinGlobalActions.setIsActive(true));
		const response = await extra.api.post<ManualResult>("/manual", authData);
		if (!response.data) {
			throw new Error();
		}
		dispatch(manualFormActions.setSuccess(200));
		return response.data;
	} catch (e) {
		dispatch(manualFormActions.setSuccess(400));
		return rejectWithValue("Произошла ошибка на сервере!");
	} finally {
		dispatch(spinGlobalActions.setIsActive(false));
	}
});

import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSelectedUserData = createAsyncThunk<
	any,
	void,
	ThunkConfig<string>
>("selectedUserAction", async (inited, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;

	try {
		dispatch(spinGlobalActions.setIsActive(true));
		const response = await extra.api.get<any>(`/card?barcode=${inited}`);
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

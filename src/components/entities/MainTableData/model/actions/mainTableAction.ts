import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface GetCardsListProps {
	query?: string;
	total?: number;
	page?: number;
	region?: string;
}

export const getCardsList = createAsyncThunk<
	any,
	GetCardsListProps,
	ThunkConfig<string>
>("mainTableAction", async (props, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	const { query = "", total = 10, page = 1, region = "" } = props;

	try {
		dispatch(spinGlobalActions.setIsActive(true));
		const response = await extra.api.get<any>(
			`/cards?page=${page}${
				region === "all" ? "" : `&region=${region}`
			}&by=${total}&query=${query}`
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
});

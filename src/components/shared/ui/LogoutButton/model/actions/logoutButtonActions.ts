import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { spinGlobalActions } from "@/components/shared/ui/SpinGlobal";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AuthorizationProps {
	email: string;
	password: string;
}

interface AuthorizationResult {
	errors?: string;
	success: boolean;
	message: string;
	data: {
		user: any;
		token: string;
	};
}

export const authorization = createAsyncThunk<
	AuthorizationResult,
	AuthorizationProps,
	ThunkConfig<string>
>("authorization", async (authData, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;

	try {
		dispatch(spinGlobalActions.setIsActive(true));
		const response = await extra.api.post<AuthorizationResult>(
			"/login",
			authData
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

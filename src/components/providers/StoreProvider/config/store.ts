import { $api } from "@/components/shared/api/api";
import { userReducer } from "@/components/entities/User";
import { regionsReducer } from "@/components/entities/RegionsData";
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { spinGlobalReducer } from "@/components/shared/ui/SpinGlobal";
import { selectedUserReducer } from "@/components/entities/SelectedUser";
import { historyTableReducer } from "@/components/entities/HistoryTableData";
import { mainTableReducer } from "@/components/entities/MainTableData/model/slice/mainTableSlice";
import { manualFormReducer } from "@/components/widgets/FormManualCard/model/slice/formManuCardSlice";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema): any {
	const rootReducers: ReducersMapObject<StateSchema> = {
		regions: regionsReducer,
		spinGlobal: spinGlobalReducer,
		mainTable: mainTableReducer,
		historyTable: historyTableReducer,
		selectedUser: selectedUserReducer,
		form: manualFormReducer,
		user: userReducer,
	};

	const extraArg: ThunkExtraArg = {
		api: $api,
	};

	return configureStore({
		reducer: rootReducers,
		devTools: true,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	});
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];

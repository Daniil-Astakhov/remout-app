import { AxiosInstance } from "axios";
import { HistorySchema } from "@/components/entities/HistoryTableData/model/types/mainTableTypes";
import { TableSchema } from "@/components/entities/MainTableData";
import { RegionsSchema } from "@/components/entities/RegionsData";

import { SelectedSchema } from "@/components/entities/SelectedUser";
import { UserSchema } from "@/components/entities/User";

import { SpinGlobalSchema } from "@/components/shared/ui/SpinGlobal";
import { StateFormSchema } from "@/components/widgets/FormManualCard/model/types/formManuCardSchema";

export interface StateSchema {
	spinGlobal: SpinGlobalSchema;
	regions: RegionsSchema;
	mainTable: TableSchema;
	historyTable: HistorySchema;
	selectedUser: SelectedSchema;
	form: StateFormSchema;
	user: UserSchema;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}

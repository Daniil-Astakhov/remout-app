import { StateSchema } from "@/components/providers/StoreProvider";

export const getSelectedUser = (state: StateSchema): any =>
	state.selectedUser.selected;

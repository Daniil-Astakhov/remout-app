import { StateSchema } from "@/components/providers/StoreProvider";

export const getGlobalSpin = (state: StateSchema): any =>
	state.spinGlobal.isActive;

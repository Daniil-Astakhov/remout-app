import { StateSchema } from "@/components/providers/StoreProvider";

export const getStatus = (state: StateSchema): any => state.form.success;

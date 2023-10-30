import { StateSchema } from "@/components/providers/StoreProvider";

export const getRegionsList = (state: StateSchema): any => state.regions.region;

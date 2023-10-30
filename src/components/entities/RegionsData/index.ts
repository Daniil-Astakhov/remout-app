import { regionsActions, regionsReducer } from "./model/slice/regionsSlice";
import { getRegionsList } from "./model/selectors/regionsSelectors";
import type { RegionsSchema, RegionsType } from "./model/types/regionsTypes";

export {
	regionsActions,
	regionsReducer,

	// actions

	// selectors
	getRegionsList,

	// types
	RegionsType,
	RegionsSchema,
};

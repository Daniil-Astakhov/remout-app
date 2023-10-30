import type { UserSchema, UserType } from "./model/types/userTypes";

import { getUserData } from "./model/selectors/userSelectors";
import { getUser } from "./model/actions/userActionPhone";
import { getUserBarcode } from "./model/actions/userActionBarcode";

import { userActions, userReducer } from "./model/slice/userSlice";

export {
	userActions,
	userReducer,

	// actions
	getUser,
	getUserBarcode,

	// selectors
	getUserData,

	// types
	UserType,
	UserSchema,
};

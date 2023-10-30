import { StateSchema } from "@/components/providers/StoreProvider";

export const getUserData = (state: StateSchema): any => state.user.user;

export const getUserCards = (state: StateSchema): any => state.user.cards;

import { AppDispatch } from "@/components/providers/StoreProvider";
import { useDispatch } from "react-redux";

export const useAppDispatch = (): any => useDispatch<AppDispatch>();

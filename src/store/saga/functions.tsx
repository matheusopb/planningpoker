import { UserState } from "../ducks/user/types";

export const getUser = ({ userReducer }: { userReducer: UserState }) => userReducer;

import { UserState } from "../ducks/user/types";
import { RoomState } from "../ducks/room/types";

export const getUser = ({ userReducer }: { userReducer: UserState }) => userReducer;
export const getRoomReducer = ({ roomReducer }: { roomReducer: RoomState }) => roomReducer;

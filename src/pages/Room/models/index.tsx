import { RoomState, RoomActions } from "../../../store/ducks/room/types"
import { UserState } from "../../../store/ducks/user/types"

interface StateProps {
    roomReducer: RoomState,
    userReducer: UserState
}

interface DispatchProps {
    actions?: {
        roomActions?: RoomActions,
    }
}

interface OwnProps {

}

export type RoomProps = StateProps & DispatchProps & OwnProps
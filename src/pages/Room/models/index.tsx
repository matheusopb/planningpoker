import { RoomState, RoomActions } from "../../../store/ducks/room/types"
import { MemberActions, MemberState } from "../../../store/ducks/member/types"
import { UserState } from "../../../store/ducks/user/types"

interface StateProps {
    roomReducer: RoomState,
    userReducer: UserState,
    memberReducer: MemberState

}

interface DispatchProps {
    actions?: {
        room?: RoomActions,
        member: MemberActions
    }
}

interface OwnProps {

}

export type RoomProps = StateProps & DispatchProps & OwnProps
import { RoomState, RoomActions } from "../../../store/ducks/room/types"
import { MemberActions, MemberState } from "../../../store/ducks/member/types"
import { UserState } from "../../../store/ducks/user/types"
import { VoteActions, VoteState } from "../../../store/ducks/vote/types"

interface StateProps {
    roomReducer: RoomState,
    userReducer: UserState,
    memberReducer: MemberState,
    voteReducer: VoteState
}

interface DispatchProps {
    actions?: {
        room?: RoomActions,
        member: MemberActions,
        vote: VoteActions
    }
}

interface OwnProps {

}

export type RoomProps = StateProps & DispatchProps & OwnProps
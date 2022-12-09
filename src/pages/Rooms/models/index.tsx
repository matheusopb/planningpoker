import { RoomsState, RoomsActions } from "../../../store/ducks/rooms/types"
import { AuthState, AuthActions } from "../../../store/ducks/auth/types"

interface StateProps {
    roomsReducer: RoomsState,
    authReducer: AuthState,
    actions?: {
        authActions?: AuthActions,
        roomsActions?: RoomsActions,
    }
}

interface DispatchProps {

}

interface OwnProps {

}

export type RoomsProps = StateProps & DispatchProps & OwnProps
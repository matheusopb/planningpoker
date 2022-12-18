import { RoomsState, RoomsActions } from "../../../store/ducks/rooms/types"
import { AuthState, AuthActions } from "../../../store/ducks/auth/types"
import { Room, RoomActions } from "../../../store/ducks/room/types"

interface StateProps {
    roomsReducer: RoomsState,
    authReducer: AuthState,
}

interface DispatchProps {
    actions?: {
        authActions?: AuthActions,
        roomsActions?: RoomsActions,
        roomActions?: RoomActions,
    }
}

interface OwnProps {

}

export type HomeProps = StateProps & DispatchProps & OwnProps

export interface HomeViewProps {
    rmRoom(id: string): void
    addRoom(): void
    goToRoom(id: string): void
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    rooms: Room[],
    sair(): void

}
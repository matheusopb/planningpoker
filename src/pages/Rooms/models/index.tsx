import { RoomsState } from "../../../store/ducks/rooms/types"

interface StateProps {
    roomsReducer: RoomsState
}

interface DispatchProps {
    loadRequest(): void;
}

interface OwnProps {

}

export type RoomsProps = StateProps & DispatchProps & OwnProps
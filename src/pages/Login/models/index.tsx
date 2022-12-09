import { AuthState } from "../../../store/ducks/auth/types";

interface StateProps {
    authReducer: AuthState
}

interface DispatchProps {
    loadRequest(): void;
}

interface OwnProps {

}

export type LoginProps = StateProps & DispatchProps & OwnProps
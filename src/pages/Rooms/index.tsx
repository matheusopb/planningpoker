import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { RoomsProps } from './models';
import *  as AuthActions from '../../store/ducks/auth/actions'
import *  as RoomsActions from '../../store/ducks/rooms/actions'


function Rooms({
    roomsReducer,
    authReducer,
    actions,
}: RoomsProps) {
    return (
        <div>
            <br />
            <button onClick={actions?.roomsActions?.loadRequest} >{'Buscar projetos'}</button>
            <br />
            {'dados dos projetos: ' + JSON.stringify(roomsReducer.data, null, 4)}
            <br />
            <br />
            <button onClick={actions?.authActions?.loadRequest} >{'Logar'}</button>
            <button onClick={actions?.authActions?.loadLogoff} >{'Logoff'}</button>
            <br />
            {'dado usuario ' + JSON.stringify(authReducer?.data?.displayName, null, 4)}
            <br />
        </div >

    );
}


const mapStateToProps = ({ roomsReducer, authReducer }: ApplicationState) => ({
    roomsReducer: roomsReducer,
    authReducer: authReducer,

});



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            roomsActions: bindActionCreators(RoomsActions, dispatch),
            authActions: bindActionCreators(AuthActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);


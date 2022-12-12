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

    function click() {
        console.log('click')
        actions?.roomsActions?.syncData()
    }

    return (
        <div>
            {'dados dos projetos: ' + JSON.stringify(roomsReducer.data, null, 4)}
            <br />
            <br />
            <button onClick={actions?.roomsActions?.loadRequest} >{'Buscar projetos'}</button>
            <br />
            {'--------------------------------------------------------------------------------------------------------------------------------------------'}
            <br />
            {roomsReducer.dataAsync?.map(room => {
                return <>
                    <div key={room.id}>
                        <>
                            {"Sala id:" + room.id}
                            <br />

                            {"Sala name:" + room.name}
                            <br />
                            <br />

                        </>
                    </div >
                </>
            })
            }
            {'--------------------------------------------------------------------------------------------------------------------------------------------'}

            <br />
            <br />
            <button onClick={actions?.roomsActions?.syncStop} >{'stop'}</button>
            <button onClick={click} >{'start'}</button>

            <br />
            <br />
            <br />
            {'dado usuario ' + JSON.stringify(authReducer?.data?.email, null, 4)}
            <br />
            <br />
            <button onClick={actions?.authActions?.loadRequest} >{'Logar'}</button>
            <button onClick={actions?.authActions?.loadLogoff} >{'Logoff'}</button>
            <br />
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


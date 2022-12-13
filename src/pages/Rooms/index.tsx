import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { RoomsProps } from './models';
import *  as AuthActions from '../../store/ducks/auth/actions'
import *  as RoomsActions from '../../store/ducks/rooms/actions'
import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";


function Rooms({
    roomsReducer,
    authReducer,
    actions,
}: RoomsProps) {
    const navigate = useNavigate();

    const [name, setName] = useState<string>(``);
    function click() {
        actions?.roomsActions?.syncData()
    }
    function goToRoom(id: string) {
        navigate(`/room?id=${id}`)

    }
    const [queryParameters] = useSearchParams()

    return (
        <div>
            {'dados dos projetos: ' + JSON.stringify(roomsReducer.data, null, 4)}
            <br />
            <br />
            <button onClick={actions?.roomsActions?.loadRequest} >{'Buscar salas sync'}</button>
            <br />
            <br />

            <input placeholder='nome da sala' type="text" name="roomName" value={name} onChange={(e) => setName(e.target.value)} />
            <br />

            <button onClick={() => { actions?.roomsActions?.addData({ name: name }) }} >{'add sala'}</button>

            <br />
            {'--------------------------------------------------------------------------------------------------------------------------------------------'}
            <br />
            <br />

            {roomsReducer.dataAsync?.map(room => {
                return <>
                    <div key={room.id}>
                        <>
                            {"Sala id: " + room.id}
                            <br />

                            {"Sala name: " + room.name}
                            <br />
                            <button onClick={() => { actions?.roomsActions?.rmDocument(room.id) }} >{'Deletar sala'}</button>
                            <button onClick={() => { goToRoom(room.id) }} >{'Ir para sala'}</button>

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


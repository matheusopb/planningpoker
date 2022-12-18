
//Libs
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//Js
import { ApplicationState } from '../../store';
import { HomeProps } from './models';

//Actions
import *  as AuthActions from '../../store/ducks/auth/actions'
import *  as RoomsActions from '../../store/ducks/rooms/actions'
import *  as RoomActions from '../../store/ducks/room/actions'

//Components
import HomeView from './view';


function Home({
    roomsReducer,
    actions,
}: HomeProps) {
    const navigate = useNavigate();
    const [name, setName] = useState<string>(``);

    function goToRoom(id: string) {
        navigate(`/room?id=${id}`)
    }

    function addRoom() {
        actions?.roomActions?.addData(name)
    }

    function rmRoom(id: string) {
        actions?.roomActions?.rmData(id)
    }

    function sair() {
        actions?.authActions?.loadLogoff()
    }
    return (<HomeView
        rmRoom={rmRoom}
        addRoom={addRoom}
        goToRoom={goToRoom}
        name={name}
        setName={setName}
        sair={sair}
        rooms={roomsReducer.data}
    />);
}

const mapStateToProps = ({ roomsReducer, authReducer }: ApplicationState) => ({
    roomsReducer: roomsReducer,
    authReducer: authReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            roomActions: bindActionCreators(RoomActions, dispatch),
            roomsActions: bindActionCreators(RoomsActions, dispatch),
            authActions: bindActionCreators(AuthActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


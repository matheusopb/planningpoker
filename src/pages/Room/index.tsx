import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { RoomProps } from './models';
import *  as RoomActions from '../../store/ducks/room/actions'
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import userEvent from '@testing-library/user-event';


function Room({
    roomReducer,
    userReducer,
    actions,
}: RoomProps) {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams()
    const [roomId] = useState<string>(queryParameters.get("id") || '');
    const [loading, setLoading] = useState<boolean>(roomReducer.loading);

    useEffect(() => {
        actions?.roomActions?.syncData(roomId)
        actions?.roomActions?.syncUsersData(roomId)
    }, [actions?.roomActions, roomId])

    useEffect(() => {
        if (!roomReducer.loading && roomReducer.users.length && !roomReducer.users.find(roomUser => roomUser.id === userReducer.user?.id)) {
            console.log('console.log')
        }
    }, [roomReducer.loading, roomReducer.users, userReducer.user?.id])

    useEffect(() => {
        setLoading(roomReducer.loading)
    }, [roomReducer.loading])



    return (
        !loading ?
            <div>
                <br />
                {'sala: ' + roomReducer.room?.id}
                <br />
                {'Nome: ' + roomReducer.room?.name}
                <br />
                <br />
                {'-------------users-----------------'}
                <br />
                <br />

                {roomReducer.users?.map(user => {
                    return <>
                        <div key={user.id}>
                            <>
                                {"id: " + user.id}
                                <br />
                                {"name: " + user.name}
                                <br />
                                {"type: " + user.type}
                                <br />
                                <br />

                            </>
                        </div >
                    </>
                })
                }
                {'-------------users-----------------'}

            </div > :
            <div>
                <h1>{'Carregando'}</h1>
            </div>

    );
}


const mapStateToProps = ({ roomReducer, userReducer }: ApplicationState) => ({
    roomReducer: roomReducer,
    userReducer: userReducer
});



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            roomActions: bindActionCreators(RoomActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);


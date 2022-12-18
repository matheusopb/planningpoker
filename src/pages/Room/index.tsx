
//Libs
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

//Js
import { RoomProps } from './models';
import { Member, MemberType } from '../../store/ducks/member/types';

//Actions
import *  as RoomActions from '../../store/ducks/room/actions'
import *  as MemberActions from '../../store/ducks/member/actions'

function Room({
    roomReducer,
    userReducer,
    memberReducer,
    actions,
}: RoomProps) {
    const [queryParameters] = useSearchParams()
    const [roomId] = useState<string>(queryParameters.get("id") || '');
    const [myAccess, setMyAccess] = useState<MemberType | undefined>();

    useEffect(() => {
        actions?.room?.syncData(roomId)
        actions?.member?.syncData(roomId)
    }, [])

    useEffect(() => {

        const myDate: Member | undefined = memberReducer.members.find(member => member.userId === userReducer.user?.id)
        if (!memberReducer.loadings.data && memberReducer.members.length && !myDate && userReducer.user) {
            actions?.member?.addData({
                roomId: roomId,
                type: 'request',
                userData: userReducer.user,
                userId: userReducer.user?.id
            })
        } else {
            setMyAccess(myDate?.type)
        }
    }, [memberReducer.members, memberReducer.loadings.data, userReducer.user?.id])

    function aproveRequest(member: Member) {
        actions?.member?.editData({ ...member, type: 'user' })
    }

    function beAdmin(member: Member) {
        actions?.member?.editData({ ...member, type: 'admin' })
    }

    function removeAccess(member: Member) {
        actions?.member?.editData({ ...member, type: 'request' })
    }


    return (
        // !loading ?
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

            {memberReducer.members?.map(member => {
                return <>
                    <div key={member.userId}>
                        <>
                            {"id: " + member.userId}
                            <br />
                            {"name: " + member.userData.name}
                            <br />
                            {"type: " + member.type}
                            <br />
                            <br />
                            {!(myAccess === 'admin' && userReducer.user?.id !== member.userId) ? null : <>
                                <button onClick={() => { aproveRequest(member) }} >{'Aprovar'}</button>
                                <button onClick={() => { beAdmin(member) }} >{'Admin'}</button>
                                <button onClick={() => { removeAccess(member) }} >{'Remover'}</button>
                                <br />
                                <br />
                            </>
                            }
                        </>
                    </div >
                </>
            })
            }
            {'----------------------------------'}
        </div>
        // {/* </div > :
        // <div>
        //     <h1>{'Carregando'}</h1>
        // </div> */}

    );
}


const mapStateToProps = ({ roomReducer, userReducer, memberReducer }: ApplicationState) => ({
    roomReducer: roomReducer,
    userReducer: userReducer,
    memberReducer: memberReducer
});



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            room: bindActionCreators(RoomActions, dispatch),
            member: bindActionCreators(MemberActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);


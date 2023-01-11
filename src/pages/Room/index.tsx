
//Libs
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

//Js
import { RoomProps } from './models';
import { Member, MemberType } from '../../store/ducks/member/types';

//Actions
import *  as RoomActions from '../../store/ducks/room/actions'
import *  as MemberActions from '../../store/ducks/member/actions'
import *  as VoteActions from '../../store/ducks/vote/actions'
import { Vote } from '../../store/ducks/vote/types';


type ObjectMember = {
    [key: string]: Member;
};


function Room({
    roomReducer,
    userReducer,
    memberReducer,
    voteReducer,
    actions,
}: RoomProps) {
    let { id } = useParams<"id">();

    const [roomId] = useState<string>(id || '');
    const [myAccess, setMyAccess] = useState<MemberType | undefined>();
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [myVote, setMyVote] = useState<number>(0);
    const [alreadyVoted, setAlreadyVoted] = useState<Vote | undefined>();

    const [users, setUsers] = useState<ObjectMember>();

    useEffect(() => {
        actions?.room?.syncData(roomId)
        actions?.member?.syncData(roomId)
        actions?.vote?.syncData(roomId, roomReducer?.room?.showVote ? roomReducer.room.showVote : 1)
    }, [])


    useEffect(() => {

        var object: ObjectMember = memberReducer.members.reduce((obj: ObjectMember, item) => ((obj[item.userId] = item), obj), {});
        object = Object.assign({ id: id }, object);
        console.log(object);
        setUsers(object)
    }, [id, memberReducer.members])

    useEffect(() => {
        actions?.vote?.syncData(roomId, roomReducer?.room?.showVote ? roomReducer.room.showVote : 1)
    }, [roomReducer.room?.showVote])

    useEffect(() => {
        const data: Vote | undefined = voteReducer.votes.find(votes => votes.userId === userReducer.user?.id)
        if (!data) {
            setAlreadyVoted(undefined)
            setMyVote(0)

        } else {
            setMyVote(data.vote)
            setAlreadyVoted(data)
        }
    }, [userReducer.user?.id, voteReducer.votes])

    useEffect(() => {
        if (!roomReducer.loadings.data && !memberReducer.loadings.data) {
            setLoadingPage(false)
        }
    }, [loadingPage, memberReducer.loadings.data, roomReducer.loadings.data])

    useEffect(() => {
        const myDate: Member | undefined = memberReducer.members.find(member => member.userId === userReducer.user?.id)
        if (
            !loadingPage &&
            !myDate &&
            !memberReducer.loadings.add &&
            !memberReducer.loadings.data &&
            memberReducer.members.length &&
            userReducer.user
        ) {
            actions?.member?.addData({
                roomId: roomId,
                type: 'request',
                userData: userReducer.user,
                userId: userReducer.user?.id
            })
        } else {
            setMyAccess(myDate?.type)
        }
    }, [memberReducer.members, memberReducer.loadings.data, userReducer.user?.id, memberReducer.loadings.add, userReducer.user, actions?.member, roomId, loadingPage])

    function aproveRequest(member: Member) {
        actions?.member?.editData({ ...member, type: 'user' })
    }

    function beAdmin(member: Member) {
        actions?.member?.editData({ ...member, type: 'admin' })
    }

    function removeAccess(member: Member) {
        actions?.member?.editData({ ...member, type: 'request' })
    }

    function addNumberVote() {
        if (roomReducer.room) {
            actions?.room?.editData({ ...roomReducer.room, showVote: roomReducer?.room?.showVote ? roomReducer.room.showVote + 1 : 1 })
        }
    }

    function subNumerVote() {
        if (roomReducer.room && roomReducer?.room.showVote && roomReducer?.room.showVote > 1) {
            actions?.room?.editData({ ...roomReducer.room, showVote: roomReducer?.room?.showVote ? roomReducer.room.showVote - 1 : 1 })
        }
    }

    function changeHide() {
        if (roomReducer.room) {
            actions?.room?.editData({ ...roomReducer.room, hideVotes: roomReducer?.room?.hideVotes ? !roomReducer?.room?.hideVotes : true })
        }
    }

    function vote(vote: number) {
        if (alreadyVoted) {
            actions?.vote.editData({ ...alreadyVoted, vote: vote })
        } else {
            if (roomReducer.room && userReducer.user) {
                actions?.vote.addData({ roomId: roomId, round: roomReducer.room.showVote ?? 1, userId: userReducer.user?.id, vote: vote })
            }
        }
    }


    return (
        // !loading ?
        <div>
            <br />
            {'sala: ' + roomReducer.room?.id}
            <br />
            {'Nome: ' + roomReducer.room?.name}
            <br />
            {'NumberVote: ' + roomReducer.room?.showVote}
            <br />
            {'Nome: ' + roomReducer.room?.hideVotes}
            <br />
            <br />
            <Button variant="secondary">Secondary</Button>{' '}

            {!(myAccess === 'admin') ? null : <>
                <button onClick={addNumberVote} >{'+'}</button>
                <br />

                <button onClick={subNumerVote} >{'-'}</button>
                <br />

                <button onClick={changeHide} >{'changeHide'}</button>
                <br />
                <br />
            </>}

            {!(myAccess !== 'request') ? null : <>
                {'Vote'}
                <br />
                {'my Vote: ' + myVote}
                <br />
                <button onClick={() => { vote(1) }} >{'1'}</button>
                <button onClick={() => { vote(2) }} >{'2'}</button>
                <button onClick={() => { vote(3) }} >{'3'}</button>
                <button onClick={() => { vote(4) }} >{'4'}</button>
                <button onClick={() => { vote(5) }} >{'5'}</button>

                <br />
                <br />
            </>}
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

            {'-------------votes-----------------'}
            <br />
            <br />
            {voteReducer.votes?.map(vote => {
                return <>
                    <div key={vote.userId}>
                        <>
                            {"name: " + users?.[vote.userId].userData.name}
                            <br />
                            <br />
                            {"vote: " + (roomReducer.room?.hideVotes ? vote.vote : '***')}
                            <br />
                            <br />
                            <br />
                        </>
                    </div >
                </>
            })
            }
            {!voteReducer?.votes.length ? null : <>
                {'-------------media-----------------'}
                <br />
                {roomReducer.room?.hideVotes ? (voteReducer?.votes?.reduce((total, next) => total + next.vote, 0) / voteReducer?.votes.length) : '***'}
                <br />
                {'----------------------------------'}
            </>}

        </div>
    );
}


const mapStateToProps = ({ roomReducer, userReducer, memberReducer, voteReducer }: ApplicationState) => ({
    roomReducer: roomReducer,
    userReducer: userReducer,
    memberReducer: memberReducer,
    voteReducer: voteReducer
});



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            room: bindActionCreators(RoomActions, dispatch),
            member: bindActionCreators(MemberActions, dispatch),
            vote: bindActionCreators(VoteActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);


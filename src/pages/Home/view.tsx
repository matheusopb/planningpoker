import React from 'react';
import { HomeViewProps } from './models';

function HomeView({
    addRoom,
    rmRoom,
    goToRoom,
    name,
    setName,
    rooms,
    sair
}: HomeViewProps) {
    return (
        <div>
            <input placeholder='nome da sala' type="text" name="roomName" value={name} onChange={(e) => setName(e.target.value)} />
            <br />

            <button onClick={() => { addRoom() }} >{'add sala'}</button>
            <br />

            <br />
            {'salas'}
            <br />
            {'--------------------------------------------------------------------------------------------------------------------------------------------'}
            <br />
            <br />

            {rooms.map(room => {
                return <div key={room.id}>
                    <>
                        {"Sala id: " + room.id}
                        <br />

                        {"Sala name: " + room.name}
                        <br />
                        <button onClick={() => { rmRoom(room.id) }} >{'Deletar sala'}</button>
                        <button onClick={() => { goToRoom(room.id) }} >{'Ir para sala'}</button>

                        <br />
                        <br />

                    </>
                </div >

            })
            }
            {'--------------------------------------------------------------------------------------------------------------------------------------------'}
            <br />
            <br />
            <br />

            <button onClick={() => { sair() }} >{'Sair'}</button>

        </div >

    );
}

export default HomeView;

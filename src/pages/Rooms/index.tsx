import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { RoomsProps } from './models';
import *  as RoomsActions from '../../store/ducks/rooms/actions'


function Rooms({ roomsReducer, loadRequest }: RoomsProps) {

    return (
        <div>
            {JSON.stringify(roomsReducer.data, null, 4)}
            <br />
            <button onClick={loadRequest} >{'Buscar Informação'}</button>
        </div>
    );
}


const mapStateToProps = ({ roomsReducer }: ApplicationState) => ({
    roomsReducer: roomsReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(RoomsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);


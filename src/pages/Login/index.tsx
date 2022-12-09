import React, { useEffect, useState } from "react";

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import *  as AuthActions from '../../store/ducks/auth/actions'
import { LoginProps } from "./models";
import { useNavigate } from 'react-router-dom';

const SignIn = ({ loadRequest, authReducer }: LoginProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (authReducer?.data) {
            navigate('/rooms')
        }
    }, [authReducer])

    return (
        <div>
            <h1>Sign In</h1>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    loadRequest()
                }}
            >
                Sign In with Google
            </button>
        </div>
    );
};

const mapStateToProps = ({ authReducer }: ApplicationState) => ({
    authReducer: authReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
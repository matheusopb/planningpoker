import React, { useEffect, useState } from "react";

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import *  as AuthActions from '../../store/ducks/auth/actions'
import { LoginProps } from "./models";
import { useNavigate } from 'react-router-dom';

const SignIn = ({ loadRequest, authReducer, loadRequestCredential }: LoginProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (loading && !authReducer?.loading && authReducer?.data) {
            navigate('/rooms')
            setLoading(false)
        }
    }, [authReducer?.data, authReducer?.loading, loading, navigate])

    useEffect(() => {
        loadRequestCredential()
        setLoading(true)
    }, [])

    return (

        loading ? <>
            <h1>carregando</h1>
        </> : <>
            <div>
                <h1>Sign In</h1>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        loadRequest()

                        setLoading(true)
                    }}
                >

                    Sign In with Google
                </button>
            </div>
        </>
    );
};

const mapStateToProps = ({ authReducer }: ApplicationState) => ({
    authReducer: authReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
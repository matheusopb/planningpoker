import React, { useEffect, useState } from "react";

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import *  as AuthActions from '../../store/ducks/auth/actions'
import { LoginProps } from "./models";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './style.scss';

// function AutoLayoutSizingExample() {
//   return (
//     <Container>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={6}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={5}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

const SignIn = ({ loadRequest, authReducer, loadRequestCredential }: LoginProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (loading && !authReducer?.loading && authReducer?.error === true) {
            setLoading(false)
        }
    }, [authReducer?.error, authReducer?.loading, loading])

    useEffect(() => {
        if (!authReducer?.loading && authReducer?.data) {
            navigate('/home')
            setLoading(false)
        }
    }, [authReducer?.data, authReducer?.loading, loading, navigate])

    useEffect(() => {
        loadRequestCredential()
        setLoading(true)
    }, [loadRequestCredential])

    return (

        <Container >

            <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Row class="bg-base " style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    padding: '60px'

                }}>
                    <Col xxxl={12}
                        xxl={2}
                        xl={2}
                        lg={4}
                        md={6}
                        sm={8}
                        xs={8}
                        xxs={12}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            height: '100%',
                            backgroundColor: `rgba(255, 255, 255, 0.11)`,
                            borderRadius: `16px`,
                            boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
                            backdropFilter: `blur(9.4px)`,
                        }}
                    >
                        <h3>
                            Bem vindo!
                        </h3>

                        <h6>
                            Por enquanto nosso unico meio de login é o google, em breve teremos novas formas de login, voce tambem pode contribuir.
                        </h6>

                        <Button variant="primary" disabled={loading} onClick={(event) => {
                            event.preventDefault();
                            loadRequest()
                            setLoading(true)
                        }}>
                            {
                                loading ? <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Carregando...
                                </> :
                                    <>
                                        Sign In with Google
                                    </>
                            }

                        </Button>


                    </Col>
                </Row>
            </div >

        </Container >

    );

};

const mapStateToProps = ({ authReducer }: ApplicationState) => ({
    authReducer: authReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
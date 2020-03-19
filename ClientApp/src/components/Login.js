import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import { connect } from "react-redux";
import logInAccount from '../actions/AccountActions';
import store from '../store/Store';
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', role: '' };
        this.login = this.login.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeLogin(event) {
        this.setState({ login: event.target.value });
    }

    async login() {
        var data = {
            login: this.state.login,
            password: this.state.password
        }
        try {
            await fetch('sendrequest/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            store.dispatch(logInAccount(this.state.login, true));

        }
        catch (error) {
            console.error('Ошибка:', error)
        }


    }

    render() {
        console.log('from props ' + this.props.username + this.props.isLogged);
        if (this.props.isLogged === false || this.props.username === undefined || this.props.username === '') {
            return (
                <Col lg={3}>
                    <form>
                        <input type="email" id="emailInput" onChange={this.onChangeLogin} name="passwordInput" placeholder="E-Mail" />
                        <input type="password" id="passwordInput" onChange={this.onChangePassword} name="passwordInput" placeholder="Password" />
                        <Button className="btn btn-primary" onClick={this.login} >Log in</Button>
                    </form>
                </Col>
            )
        }
        else {
            return (
                <React.Fragment>
                    <h1>Вы вошли в аккаунт.</h1>
                    Перейти в <Link to="/profile">настройки профиля</Link>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps, { logInAccount })(Login);

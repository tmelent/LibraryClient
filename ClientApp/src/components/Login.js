import React, { Component } from 'react';
import { Col, Button, Spinner } from 'reactstrap';
import { connect } from "react-redux";  
import logInAccount from '../actions/AccountActions';
import { Link } from 'react-router-dom';

import './styles/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', role: ''};
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
        var spinner = document.getElementById('login_spinner');
        spinner.removeAttribute('hidden');
        var loginbtn = document.getElementById('login_btn');
        loginbtn.innerHTML = spinner.outerHTML + ' Вход...';
        var data = {
            login: this.state.login,
            password: this.state.password
        }
        try {
           var response = await fetch('sendrequest/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
           });            
            spinner.setAttribute('hidden', '');
            if (response.ok) {
                this.props.logInAccount(this.state.login, true);
            } else {
                loginbtn.innerHTML = spinner.outerHTML + "Войти";
                alert("Введен неправильный логин или пароль.");                
            }

        }
        catch (error) {
            console.error('Ошибка:', error)
        }
    }

    render() {       
           
        var button1 = <Button id="login_btn" variant="primary" onClick={this.login}>
            <Spinner
                id="login_spinner"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                aria-hidden="true"
                hidden
                />            
            Войти
            </Button>         
        
        if (this.props.isLogged === false || this.props.username === undefined || this.props.username === '') {
            return (
                <Col lg={3}>
                    <h3>Вход в аккаунт</h3>
                    <form>                        
                        <input type="email" className="textField" id="emailInput" onChange={this.onChangeLogin} name="passwordInput" placeholder="E-mail/Логин" />
                        <input type="password" className="textField" id="passwordInput" onChange={this.onChangePassword} name="passwordInput" placeholder="Пароль" />
                        {button1}
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
        username: state.account.username,
        isLogged: state.account.isLogged
    }
}

export default connect(mapStateToProps, { logInAccount })(Login);

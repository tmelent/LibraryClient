import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '', result: '' };
        
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.register = this.register.bind(this);

    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangePasswordConfirmation(event) {
        this.setState({ confirmPassword: event.target.value });
    }
    onChangeLogin(event) {
        this.setState({ login: event.target.value });
    }
    onChangeFirstName(event) {
        this.setState({ firstName: event.target.value });
    }
    onChangeLastName(event) {
        this.setState({ lastName: event.target.value });
    }
    onChangePhone(event) {
        this.setState({ phoneNumber: event.target.value });
    }


    
    register(event) {
        var data = {
            login: this.state.login,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword            
        }

        fetch('sendrequest/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then(result => this.setState({ response: result }))
    }

    render() {
        return (
            <Col lg={3}>
                <form >
                    <input type="email" id="emailInput" onChange={this.onChangeLogin} name="passwordInput" placeholder="E-Mail" />
                    <input type="password" id="passwordInput" onChange={this.onChangePassword} name="passwordInput" placeholder="Password" />
                    <input type="password" id="passwordConfirmation" onChange={this.onChangePasswordConfirmation} name="passwordConfInput" placeholder="Confirm password" />
                    <input type="text" id="firstName" onChange={this.onChangeFirstName} name="firstName" placeholder="First Name" />
                    <input type="text" id="lastName" onChange={this.onChangeLastName} name="lastName" placeholder="Last Name" />
                    <input type="tel" id="phoneNumber" onChange={this.onChangePhone} name="phone" placeholder="Phone number" />
                    <Button className="btn btn-primary" onClick={this.register}>Register</Button>
                </form>
            </Col>
        )
    }
}
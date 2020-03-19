import React, { Component } from 'react';
import { Button } from 'reactstrap';

const LabelStyle = {
    display: "block",    
};

const DivStyle = {
    marginTop: "0.5rem",
    marginBottom: "0.5rem"
};

const Header = {
    paddingBottom: "2rem"
};

export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", email: "", phoneNumber: "", emailBeforeChanged: "", emailConfirmation: "" };
        this.getProfileData = this.getProfileData.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEmailConfirmation = this.onChangeEmailConfirmation.bind(this);
        this.applyChanges = this.applyChanges.bind(this);        
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeEmailConfirmation(event) {
        this.setState({ emailConfirmation: event.target.value });
    }

    onChangePhoneNumber(event) {
        this.setState({ phoneNumber: event.target.value });
    }

    async componentDidMount() {
        await this.getProfileData();
    }

    async getProfileData() {
        await fetch('sendrequest/getProfileData', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(response => response.json())
            .then(result => this.setState({
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.login,
                emailBeforeChanged: result.login,
                phoneNumber: result.phoneNumber
            }));
    }    

    async applyChanges() {
        if (this.state.email !== this.state.emailConfirmation) {
            alert("Check your email confirmation field.");
        }
        else {
            var data = {
                username: this.state.emailBeforeChanged,
                email: this.state.email,
                phone: this.state.phoneNumber
            }
            await fetch('sendrequest/updateprofiledata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            this.getProfileData();
            
        }
    }

    render() {
        return (
            <div>
                <h2 style={Header}>Account Info</h2>
                <form>
                    <div style={DivStyle}>
                        <label style={LabelStyle}>First Name</label>
                        <input type="text" disabled readOnly value={this.state.firstName} name="firstName" />
                    </div>
                    <div style={DivStyle}>
                        <label style={LabelStyle}>Last Name</label>
                        <input type="text" disabled readOnly value={this.state.lastName} name="lastName" />
                    </div>
                    <div style={DivStyle}>
                        <label style={LabelStyle}>Email (login)</label>
                        <input type="text" onChange={this.onChangeEmail} value={this.state.email} name="email" />
                    </div>
                    <div style={DivStyle}>
                        <label style={LabelStyle}>Email confirmation</label>
                        <input type="text" onChange={this.onChangeEmailConfirmation} name="email" />
                    </div>
                    <div style={DivStyle}>
                        <label style={LabelStyle}>Phone number</label>
                        <input type="phone" onChange={this.onChangePhoneNumber} value={this.state.phoneNumber} name="phoneNumber" />
                    </div>
                    <Button className="btn btn-primary" onClick={this.applyChanges}>Update account info</Button>
                </form>
            </div>
        );
    }
}



export default Profile;
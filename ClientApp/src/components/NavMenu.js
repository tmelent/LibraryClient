import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from "react-redux";
import logInAccount from '../actions/AccountActions';
import store from '../store/Store';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    async componentDidMount() {
        await this.getProfileData();
    }

    componentWillReceiveProps() {
        if (!this.props.isLogged) {
            this.getProfileData();
        }
    }

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true,
            firstName: "",
            login: ""
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    async getProfileData() {
        var response = await fetch('sendrequest/getProfileData', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            var result = await response.json();
            this.setState({
                firstName: result.firstName,
                login: result.login
            });
            store.dispatch(logInAccount(this.state.login, true));
        }
    }

    async logout(e) {
        e.preventDefault();
        await fetch('sendrequest/logout', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });
        store.dispatch(logInAccount('', false));
        this.setState({ firstName: "" });
    }

    render() {
        var loginMenu = <NavLink tag={Link} className="text-dark" to="/login">Log in</NavLink>;
        if (this.state.firstName !== null && this.state.firstName !== undefined && this.state.firstName !== '') {
            loginMenu = <React.Fragment><NavItem><NavLink tag={Link} className="text-dark" to="/profile">{this.state.firstName}</NavLink></NavItem>
                <NavItem><NavLink tag={Link} className="text-dark" to="/profle" onClick={this.logout}>Logout</NavLink></NavItem></React.Fragment>;
        }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">LibraryClient</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                {loginMenu}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps, { logInAccount })(NavMenu);
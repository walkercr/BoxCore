import React from 'react';
import './nav-menu.scss';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class NavMenu extends React.Component {

    static propTypes = {
        loggedIn: React.PropTypes.bool.isRequired,
        onHome: React.PropTypes.func.isRequired,
        onPerformance: React.PropTypes.func.isRequired,
        onLeaderboard: React.PropTypes.func.isRequired,
        onProfile: React.PropTypes.func.isRequired,
        onLogout: React.PropTypes.func.isRequired
    };

    state = {show: false};

    handleToggle() {
        this.setState({show: !this.state.show});
    }

    handleSelection(callback) {
        this.setState({show: false});
        callback();
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <Navbar fluid inverse className='nav-menu'>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href='#'><em>BoxDashboard</em></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            );
        } else {
            return (
                <Navbar fluid inverse className='nav-menu' expanded={this.state.show}
                        onToggle={this.handleToggle.bind(this)}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href='#'><em>BoxDashboard</em></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight key={1}>
                            <NavItem onClick={() => this.handleSelection(this.props.onHome)}>
                                Home
                            </NavItem>
                            <NavItem onClick={() => this.handleSelection(this.props.onPerformance)}>
                                My Performance
                            </NavItem>
                            <NavItem onClick={() => this.handleSelection(this.props.onLeaderboard)}>
                                Leaderboard
                            </NavItem>
                            <NavItem onClick={() => this.handleSelection(this.props.onProfile)}>
                                Profile
                            </NavItem>
                            <NavItem onClick={() => this.handleSelection(this.props.onLogout)}>
                                Log Out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}
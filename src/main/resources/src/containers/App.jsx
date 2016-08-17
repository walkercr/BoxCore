import React from 'react';
import './app.scss';
import cookie from 'react-cookie';
import NavMenu from '../components/nav_menu/NavMenu.jsx';
import Login from '../components/login/Login.jsx';
import Home from '../components/home/Home.jsx';
import Performance from '../components/performance/Performance.jsx';
import Leaderboard from '../components/leaderboard/Leaderboard.jsx';
import Profile from '../components/profile/Profile.jsx';

export default class App extends React.Component {

    static username = 'username';
    static password = 'password';
    static login = 'login';
    static home = 'home';
    static performance = 'performance';
    static leaderboard = 'leaderboard';
    static profile = 'profile';

    state = {
        loggedIn: false,
        view: null,
        viewName: null,
        athlete: null
    };

    componentDidMount() {
        let username = cookie.load(App.username);
        let password = cookie.load(App.password);
        this.fetchUsers();
        if (username && password) {
            // this.fetchUser(username);
            this.goToHomePage();
        } else {
            this.goToLogin();
        }
    }

    fetchUsers() {
        let request = new XMLHttpRequest();
        request.open('GET', '/api/user/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = () => {
            if (request.status === 200) {
                console.log(JSON.parse(request.responseText));
            } else {
                console.log(request.status);
            }
        };
        request.send();
    }

    goToLogin(username = '', password = '') {
        this.setState({
            loggedIn: false,
            view: (
                <Login
                    username={username}
                    password={password}
                    onLogin={this.handleLogin.bind(this)}
                    onSignUp={this.handleSignUp.bind(this)}
                />
            ),
            viewName: App.login
        });
    }

    handleLogin(username, password, save) {
        let path = save ? '/' : '/session/';
        cookie.save(App.username, username, {path: path});
        cookie.save(App.password, password, {path: path});
        this.goToHomePage();
    }

    handleSignUp(newUser) {
        this.goToLogin(newUser.username, newUser.password);
    }

    handleLogout() {
        cookie.remove(App.username, {path: '/'});
        cookie.remove(App.password, {path: '/'});
        this.goToLogin();
    }

    handleHomePage() {
        if (this.state.viewName !== App.home) {
            this.goToHomePage();
        }
    }

    goToHomePage() {
        this.setState({
            loggedIn: true,
            view: <Home athlete={this.state.athlete} />,
            viewName: App.home
        });
    }

    handlePerformance() {
        if (this.state.viewName !== App.performance) {
            this.goToPerformance();
        }
    }

    goToPerformance() {
        this.setState({
            view: <Performance/>,
            viewName: App.performance
        });
    }

    handleLeaderboard() {
        if (this.state.viewName !== App.leaderboard) {
            this.goToLeaderboard();
        }
    }

    goToLeaderboard() {
        this.setState({view: <Leaderboard/>, viewName: App.leaderboard});
    }

    handleProfile() {
        if (this.state.viewName !== App.profile) {
            this.goToProfile();
        }
    }

    goToProfile() {
        this.setState({view: <Profile/>, viewName: App.profile});
    }

    render() {
        return (
            <div>
                <NavMenu
                    loggedIn={this.state.loggedIn}
                    onHome={this.handleHomePage.bind(this)}
                    onPerformance={this.handlePerformance.bind(this)}
                    onLeaderboard={this.handleLeaderboard.bind(this)}
                    onProfile={this.handleProfile.bind(this)}
                    onLogout={this.handleLogout.bind(this)}>
                </NavMenu>
                {this.state.view}
            </div>
        );
    }
}
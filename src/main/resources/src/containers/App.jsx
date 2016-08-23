import React from 'react';
import './app.scss';
import cookie from 'react-cookie';
import Ajax from '../ajax/Ajax.jsx';
import NavMenu from '../components/nav_menu/NavMenu.jsx';
import Login from '../components/login/Login.jsx';
import Home from '../components/home/Home.jsx';
import Performance from '../components/performance/Performance.jsx';
import Leaderboard from '../components/leaderboard/Leaderboard.jsx';
import Profile from '../components/profile/Profile.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends React.Component {

    static login = 'Login';
    static home = 'Home';
    static performance = 'Performance';
    static leaderboard = 'Leaderboard';
    static profile = 'Profile';

    static propTypes = {muiTheme: React.PropTypes.object.isRequired};
    static childContextTypes = {muiTheme: React.PropTypes.object.isRequired};

    state = {
        loggedIn: false,
        view: null,
        viewName: null,
        user: null,
        loading: false
    };

    getChildContext() {
        return {muiTheme: getMuiTheme(this.props.muiTheme)};
    }

    componentDidMount() {
        let id = cookie.load("id");
        let username = cookie.load("username");
        let password = cookie.load("password");
        if (id && username && password) {
            this.fetchUser(id);
        } else {
            this.goToLogin();
        }
    }

    fetchUser(id) {
        Ajax.httpGet('/api/user/' + id, (status, response) => {
            let user = null;
            if (status === 200) {
                user = JSON.parse(response);
            }
            this.setState({user: user, loggedIn: true});
            this.goToHomePage();
        });
    }

    goToLogin(username = '', password = '') {
        this.setState({
            loggedIn: false,
            view: (
                <Login
                    username={username}
                    password={password}
                    onLogin={this.fetchUser.bind(this)}
                    onSignUp={this.handleSignUp.bind(this)}
                />
            ),
            viewName: App.login
        });
    }

    handleSignUp(newUser) {
        this.goToLogin(newUser.username, newUser.password);
    }

    handleLogout() {
        cookie.remove("id", {path: '/'});
        cookie.remove("username", {path: '/'});
        cookie.remove("password", {path: '/'});
        this.goToLogin();
    }

    handleHomePage() {
        if (this.state.viewName !== App.home) {
            this.goToHomePage();
        }
    }

    goToHomePage() {
        this.setState({
            view: <Home user={this.state.user} />,
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
                {this.state.loggedIn ?
                    <NavMenu
                        title={this.state.viewName}
                        loggedIn={this.state.loggedIn}
                        onHome={this.handleHomePage.bind(this)}
                        onPerformance={this.handlePerformance.bind(this)}
                        onLeaderboard={this.handleLeaderboard.bind(this)}
                        onProfile={this.handleProfile.bind(this)}
                        onLogout={this.handleLogout.bind(this)}>
                    </NavMenu> :
                    null
                }
                {this.state.view}
            </div>
        );
    }
}
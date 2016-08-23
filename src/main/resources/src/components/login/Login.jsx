import React from 'react';
import './login.scss';
import cookie from 'react-cookie';
import Ajax from '../../ajax/Ajax.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SignUp from './sign_up/SignUp.jsx';

export default class Login extends React.Component {

    static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

    static propTypes = {
        username: React.PropTypes.string,
        password: React.PropTypes.string,
        onLogin: React.PropTypes.func.isRequired,
        onSignUp: React.PropTypes.func.isRequired
    };

    static defaultProps = {username: '', password: ''};

    state = {
        username: this.props.username,
        password: this.props.password,
        rememberMe: false,
        signUp: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.username !== nextProps.username
                && this.props.password !== nextProps.password) {
            this.initializeState(nextProps);
        }
    }

    initializeState(props = this.props) {
        this.setState({
            username: props.username,
            password: props.password,
            rememberMe: false,
            signUp: false
        });
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleRememberMe() {
        this.setState({rememberMe: !this.state.rememberMe});
    }

    handleLogin() {
        let uri = '/api/login?username=' + this.state.username
                    + '&password=' + this.state.password;
        Ajax.httpGet(uri, this.handleLoginCallback.bind(this));
    }

    handleLoginCallback(status, response) {
        if (status === 200) {
            let path = this.state.rememberMe ? '/' : '/session/';
            let id = Number(response);
            cookie.save("id", id, {path: path});
            cookie.save("username", this.state.username, {path: path});
            cookie.save("password", this.state.password, {path: path});
            this.props.onLogin(id);
        } else {
            this.initializeState();
        }
    }

    handleGoToSignUp() {
        this.setState({signUp: true});
    }

    handleNewUserSignUp(newUserSignUp) {
        let request = new XMLHttpRequest();
        request.open('POST', '/api/user/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = () => {
            if (request.status === 200) {
                let user = JSON.parse(request.responseText);
                this.props.onSignUp(user, newUserSignUp.password);
            }
        };
        request.send(JSON.stringify(newUserSignUp));
    }

    handleSignUpCancel() {
        this.initializeState();
    }

    handleForgotPassword() {
        console.log('forgot password');
    }

    render() {
        if (this.state.signUp) {
            return (
                <SignUp
                    onSignUp={this.handleNewUserSignUp.bind(this)}
                    onCancel={this.handleSignUpCancel.bind(this)}
                />
            );
        }
        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <form className='form'>
                        <TextField
                            id='loginUsername'
                            fullWidth
                            hintText="Username Field"
                            floatingLabelText="Username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                        /><br />
                        <TextField
                            id='loginPassword'
                            fullWidth
                            hintText="Password Field"
                            floatingLabelText="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                        /><br />
                        <Checkbox
                            id='rememberMeCheckbox'
                            className='form-element'
                            label='Remeber me'
                            onClick={this.handleRememberMe.bind(this)}>
                        </Checkbox>
                        <div className='login-btn'>
                            <RaisedButton
                                primary
                                fullWidth
                                id='loginButton'
                                className='form-element'
                                label={'Log in'}
                                onClick={this.handleLogin.bind(this)}>
                            </RaisedButton>
                        </div>
                        <div className='help-container'>
                            <div className='new-account-btn'>
                                <RaisedButton
                                    secondary
                                    id='signUpButton'
                                    label={'Sign up'}
                                    onClick={this.handleGoToSignUp.bind(this)}>
                                </RaisedButton>
                            </div>
                            <div className='forgot-password'>
                                <a
                                    href='#'
                                    className='form-element'
                                    style={{color: this.context.muiTheme.palette.primary1Color}}
                                    onClick={this.handleForgotPassword.bind(this)}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
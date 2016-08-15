import React from 'react';
import './login.scss';
import {FormControl, Checkbox, Button} from 'react-bootstrap';
import SignUp from './sign_up/SignUp.jsx';

export default class Login extends React.Component {

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
        this.props.onLogin(this.state.username, this.state.password, this.state.rememberMe);
    }

    handleGoToSignUp() {
        this.setState({signUp: true});
    }

    handleNewUser(newUser) {
        this.props.onSignUp(newUser);
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
                    onSignUp={this.handleNewUser.bind(this)}
                    onCancel={this.handleSignUpCancel.bind(this)}
                />
            );
        }
        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <form className='form'>
                        <FormControl
                            type='text'
                            bsSize='large'
                            placeholder='Username'
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                        />
                        <FormControl
                            type='password'
                            bsSize='large'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                        />
                        <Checkbox
                            className='form-element'
                            bsSize='large'
                            value='off'
                            onClick={this.handleRememberMe.bind(this)}>
                            Remember Me
                        </Checkbox>
                        <div className='login-btn'>
                            <Button block
                                className='form'
                                bsStyle='primary'
                                bsSize='large'
                                onClick={this.handleLogin.bind(this)}>
                                Log in
                            </Button>
                        </div>
                        <div className='help-container'>
                            <div className='new-account-btn'>
                                <Button
                                    className='form-element'
                                    bsStyle='success'
                                    bsSize='large'
                                    onClick={this.handleGoToSignUp.bind(this)}>
                                    Sign up
                                </Button>
                            </div>
                            <div className='forgot-password'>
                                <a
                                    href='#'
                                    className='form-element'
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
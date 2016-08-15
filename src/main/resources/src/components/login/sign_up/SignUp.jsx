import React from 'react';
import './sign-up.scss';
import '../login.scss';
import {ControlLabel, FormControl, Button} from 'react-bootstrap';

export default class SignUp extends React.Component {

    static propTypes = {
        onSignUp: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired
    };

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    handleSubmit() {
        this.props.onSignUp(this.state);
    }

    handleConfirm() {
        console.log('confirm');
    }

    render() {
        return (
            <div className='container-layout'>
                <div className='form-container'>
                <form>
                    <ControlLabel>First Name:</ControlLabel>
                    <FormControl
                        type='text'
                        bsSize='large'
                        placeholder='Enter first name'
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange.bind(this)}
                    />
                    <ControlLabel className='form-element'>Last Name:</ControlLabel>
                    <FormControl
                        type='text'
                        bsSize='large'
                        placeholder='Enter last name'
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange.bind(this)}
                    />
                    <ControlLabel className='form-element'>Email:</ControlLabel>
                    <FormControl
                        type='text'
                        bsSize='large'
                        placeholder='Enter email'
                        value={this.state.email}
                        onChange={this.handleEmailChange.bind(this)}
                    />
                    <ControlLabel className='form-element'>Username:</ControlLabel>
                    <FormControl
                        type='text'
                        bsSize='large'
                        placeholder='Enter username'
                        value={this.state.username}
                        onChange={this.handleUsernameChange.bind(this)}
                    />
                    <ControlLabel className='form-element'>Password:</ControlLabel>
                    <FormControl
                        type='password'
                        bsSize='large'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange.bind(this)}
                    />
                    <ControlLabel className='form-element'>Confirm Password:</ControlLabel>
                    <FormControl
                        type='password'
                        bsSize='large'
                        placeholder='Confirm password'
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange.bind(this)}
                    />
                    <Button
                        block
                        type='button'
                        className='form-element'
                        bsSize='large'
                        bsStyle='primary'
                        onClick={this.handleSubmit.bind(this)}>
                        Submit
                    </Button>
                </form>
                </div>
            </div>
        );
    }
}
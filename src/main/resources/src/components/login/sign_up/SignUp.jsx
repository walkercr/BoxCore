import React from 'react';
import './sign-up.scss';
import '../login.scss';
import Ajax from '../../../ajax/Ajax.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

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
        confirmPassword: '',
        showConfirmation: false
    };

    handleCreateNewUser() {
        this.props.onSignUp({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        if (this.state.showConfirmation) {
            let dialogActions = [
                <RaisedButton
                    label='Cancel'
                    secondary
                    style={{marginRight: '12px'}}
                    onTouchTap={() => this.setState({showConfirmation: false})}
                />,
                <RaisedButton
                    label='Confirm'
                    primary
                    onTouchTap={this.handleCreateNewUser.bind(this)}
                />
            ];
            return (
                  <Dialog
                      title='Confirm User Details'
                      actions={dialogActions}
                      modal
                      open={this.state.showConfirmation}>
                      <Divider/>
                      {'First Name: ' + this.state.firstName}<br/>
                      {'Last Name: ' + this.state.lastName}<br/>
                      {'Email: ' + this.state.email}<br/>
                      {'Username: ' + this.state.username}
                  </Dialog>

            );
        }
        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <TextField
                        fullWidth
                        hintText='First Name'
                        floatingLabelText='FirstName'
                        type='text'
                        value={this.state.firstName}
                        onChange={e => this.setState({firstName: e.target.value})}
                    /><br />
                    <TextField
                        fullWidth
                        hintText='Last Name'
                        floatingLabelText='Last Name'
                        type='text'
                        value={this.state.lastName}
                        onChange={e => this.setState({lastName: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        hintText='Email'
                        floatingLabelText='Email'
                        type='email'
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        hintText='Username'
                        floatingLabelText='Username'
                        type='text'
                        value={this.state.username}
                        onChange={e => this.setState({username: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        hintText='Password'
                        floatingLabelText='Password'
                        type='password'
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        hintText='Confirm Password'
                        floatingLabelText='Confirm Password'
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({confirmPassword: e.target.value})}
                    />
                    <RaisedButton
                        secondary
                        className='form-element'
                        label={'Cancel'}
                        style={{marginRight: '20px'}}
                        onClick={this.props.onCancel}
                    />
                    <RaisedButton
                        primary
                        className='form-element'
                        label={'Submit'}
                        onClick={() => this.setState({showConfirmation: true})}
                    />
                </div>
            </div>
        );
    }
}
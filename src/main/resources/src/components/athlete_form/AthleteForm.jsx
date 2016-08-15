import React from 'react';
import './athlete-form.scss';
import {ControlLabel, FormControl, Button} from 'react-bootstrap';

export default class AthleteForm extends React.Component {

    static propTypes = {
        username: React.PropTypes.string,
        firstName: React.PropTypes.string,
        lastName: React.PropTypes.string,
        onSubmit: React.PropTypes.func.isRequired
    };

    static defaultProps = {username: '', firstName: '', lastName: ''};

    state = {
        username: this.props.username,
        firstName: this.props.firstName,
        lastName: this.props.lastName
    };

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleSubmit() {
        this.props.onSubmit({
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
    }

    render() {
        return (
            <form className="athlete-form">
                <ControlLabel className="form-element">Username</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.username}
                    placeholder={this.state.username ? this.state.username : "Enter username"}
                    onChange={this.handleUsernameChange.bind(this)}>
                </FormControl>
                <ControlLabel className="form-element">First Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.firstName}
                    placeholder={this.state.firstName ? this.state.firstName : "Enter first name"}
                    onChange={this.handleFirstNameChange.bind(this)}>
                </FormControl>
                <ControlLabel className="form-element">Last Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.lastName}
                    placeholder={this.state.lastName ? this.state.lastName : "Enter last name"}
                    onChange={this.handleLastNameChange.bind(this)}>
                </FormControl>
                <Button
                    type="button"
                    bsStyle="primary"
                    className="form-element"
                    onClick={this.handleSubmit.bind(this)}>
                    Submit
                </Button>
            </form>
        );
    }
}
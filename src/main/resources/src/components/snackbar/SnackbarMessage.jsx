import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackbarMessage extends React.Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <Snackbar
                open
                message={this.props.message}
                autoHideDuration={3000}>
            </Snackbar>
        );
    }
}
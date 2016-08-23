import React from 'react';
import './nav-menu.scss';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

export default class NavMenu extends React.Component {

    static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        loggedIn: React.PropTypes.bool.isRequired,
        onHome: React.PropTypes.func.isRequired,
        onPerformance: React.PropTypes.func.isRequired,
        onLeaderboard: React.PropTypes.func.isRequired,
        onProfile: React.PropTypes.func.isRequired,
        onLogout: React.PropTypes.func.isRequired
    };

    state = {open: false};

    handleSelection(callback) {
        this.setState({open: false});
        callback();
    }

    render() {
        return (
            <div>
                <AppBar
                    title={this.props.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}>
                </AppBar>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <AppBar title='Menu' showMenuIconButton={false} style={{backgroundColor: this.context.muiTheme.palette.accent1Color}}/>
                    <MenuItem onTouchTap={() => this.handleSelection(this.props.onHome)}>Home</MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={() => this.handleSelection(this.props.onPerformance)}>Performance</MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={() => this.handleSelection(this.props.onLeaderboard)}>Leaderboard</MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={() => this.handleSelection(this.props.onProfile)}>Profile</MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={() => this.handleSelection(this.props.onLogout)}>Log out</MenuItem>
                </Drawer>
            </div>
        );
    }
}
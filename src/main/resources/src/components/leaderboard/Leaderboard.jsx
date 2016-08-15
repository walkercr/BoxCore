import React from 'react';
import './leaderboard.scss';

export default class Leaderboard extends React.Component {

    static propTypes = {
        // shape this object when data format is known
        leaderboard: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <div>Leaderboard</div>
        );
    }
}
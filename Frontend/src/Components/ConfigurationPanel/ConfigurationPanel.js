import React from 'react';
import PlaylistConfiguration from './Configuration/PlaylistConfiguration';
import PanelSelector from './Selector/PanelSelector';
import BroadcastButton from './BroadcastButton';
import './ConfigurationPanel.css';

export default class ConfigurationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMode: 'playlist'
        }
    }

    renderConfiguration() {
        switch (this.state.selectedMode) {
            case 'playlist':
                return <PlaylistConfiguration/>;
            default:
                return <div>Select a mode to configure.</div>;
        }
    };

    render() {
        return (
            <div className="configuration-panel">
                {this.renderConfiguration()}
                <div>
                    <PanelSelector/>
                    <BroadcastButton/>
                </div>
            </div>
        )
    }
}

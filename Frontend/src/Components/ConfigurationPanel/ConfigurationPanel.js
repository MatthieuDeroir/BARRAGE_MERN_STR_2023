import React from 'react';
import FreeTextConfiguration from './Configuration/FreeTextConfiguration';
import ImageConfiguration from './Configuration/ImageConfiguration';
import DataConfiguration from './Configuration/DataConfiguration';
import PlaylistConfiguration from './Configuration/PlaylistConfiguration';
import ModeSelector from './Selector/ModeSelector';
import PanelSelector from './Selector/PanelSelector';
import BroadcastButton from './BroadcastButton';
import './ConfigurationPanel.css';

export default class ConfigurationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMode: null
        }
    }

    setSelectedMode = (mode) => {
        this.setState({selectedMode: mode});
    }

    renderConfiguration() {
        switch (this.state.selectedMode) {
            case 'text':
                return <FreeTextConfiguration/>;
            case 'image':
                return <ImageConfiguration/>;
            case 'data':
                return <DataConfiguration/>;
            case 'playlist':
                return <PlaylistConfiguration/>;
            default:
                return <div>Select a mode to configure.</div>;
        }
    };

    render() {
        return (
            <div className="configuration-panel">
                <ModeSelector setSelectedMode={this.setSelectedMode}/>

                {this.renderConfiguration()}
                <div>
                    <PanelSelector/>
                    <BroadcastButton/>
                </div>
            </div>
        )
    }
}


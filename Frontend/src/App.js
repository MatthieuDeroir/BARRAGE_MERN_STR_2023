import React from 'react';
import Header from './Components/Header';
import Preview from './Components/Preview';
import ConfigurationPanel from './Components/ConfigurationPanel/ConfigurationPanel';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="preview-container">
                    <div className="left-preview-container">
                        <Preview panelNumber={1}/>
                    </div>
                    <ConfigurationPanel/>
                    <div className="right-preview-container">
                        <Preview panelNumber={2}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

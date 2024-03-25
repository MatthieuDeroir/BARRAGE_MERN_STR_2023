import React, { useState, useEffect } from 'react';
import './Global.css';
import MediaMode from './pages/MediasPage'; // Assuming MediaMode is the component we refactored
import DataPage from './pages/DataPage';
import TestPage from './pages/TestPage';
import { setupWebsocketClient } from './services/WebsocketService';

function App() {
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [waterData, setWaterData] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const ws = setupWebsocketClient(handleWebsocketMessage);
    // Set up WebSocket connection
    return () => ws?.close(); // Clean up WebSocket connection
  }, []);

  const handleWebsocketMessage = (event) => {
    try {
      const result = JSON.parse(event.data);
      switch (result.type) {
        case "slideshows":
          setCurrentSlideshow(result.slideshows?.[0] || {});
          break;
        case "slideshowStatus":
          setIsTesting(result.slideshowStatus?.[0]?.isTesting || false);
          setIsRunning(result.slideshowStatus?.[0]?.isRunning || false);
          break;
        case "settings":
          setIsVeilleMode(checkIsInVeillePeriod(result.settings?.[0]));
          break;
        case "data":
          setWaterData(result);
          break;
        default:
          console.log("Unhandled message type:", result.type);
      }
    } catch (error) {
      console.error("Error parsing websocket message", error);
    }
  };

  const checkIsInVeillePeriod = (veilleData) => {
    if (!veilleData?.enable) return false;
    const currentHour = new Date().getHours();
    const [startHour, stopHour] = [veilleData.start, veilleData.stop].map(time => parseInt(time.split(":")[0], 10));
    return currentHour >= startHour && currentHour < stopHour;
  };

  // Conditional rendering based on application state
  const renderContent = () => {
    if (isVeilleMode) {
      return <div>Veille Mode Active</div>; // Placeholder for veille mode representation
    } else if (isRunning && currentSlideshow?.media && currentSlideshow.media.length > 0) {
      return <MediaMode mediaState={currentSlideshow.media} mediaMode={true} />;
    } else if (isTesting) {
      return <TestPage />;
    } else {
      return <DataPage waterData={waterData} />;
    }
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;

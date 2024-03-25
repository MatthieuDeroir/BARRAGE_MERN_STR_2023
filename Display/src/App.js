import React, { useEffect, useState } from "react";

import "./Global.css";
import DataPage from "./pages/DataPage";
import MediasPage from "./pages/MediasPage";
import TestPage from "./pages/TestPage";
import { setupWebsocketClient } from "./services/WebsocketService";

function App() {
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [waterData, setWaterData] = useState({});
  const [websocket, setWebsocket] = useState(null);

  // Fonction pour passer au média suivant
  const goToNextMedia = () => {
    setCurrentMediaIndex(prevIndex => (prevIndex + 1) % (currentSlideshow.media?.length || 1));
  };

  useEffect(() => {
    // Configuration de l'intervalle basé sur la durée du média actuel
    const intervalDuration = currentSlideshow.media && currentSlideshow.media.length > 0
      ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
      : 5000; // Utilisez une durée par défaut si nécessaire

    const mediaInterval = setInterval(goToNextMedia, intervalDuration);

    return () => clearInterval(mediaInterval); // Nettoyage de l'intervalle lors du démontage ou de la mise à jour
  }, [currentSlideshow, currentMediaIndex]);

  useEffect(() => {
    const ws = setupWebsocketClient(handleWebsocketMessage);
    setWebsocket(ws);

    return () => ws?.close(); // Nettoyage du WebSocket lors du démontage
  }, []);

  const handleWebsocketMessage = event => {
    try {
      const result = JSON.parse(event.data);

      switch(result.type) {
        case "slideshows":
          setCurrentSlideshow(result.slideshows?.[0] || {});
          setCurrentMediaIndex(0); // Réinitialisez l'index à chaque nouveau diaporama
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
          // Gérez d'autres types de messages si nécessaire
          break;
      }
    } catch (error) {
      console.error("Error while parsing websocket message", error);
    }
  };

  const checkIsInVeillePeriod = veilleData => {
    if (!veilleData?.enable) {
      return true;
    }
    const currentHour = new Date().getHours();
    const [startHour, stopHour] = [veilleData.start, veilleData.stop].map(time => parseInt(time.split(":")[0], 10));
    return currentHour >= startHour && currentHour < stopHour;
  };

  return (
    <div>
      {!isVeilleMode ? (
        <></> // Mode veille
      ) : isRunning && currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media._id}
            style={{ display: index === currentMediaIndex ? "block" : "none" }}
          >
            {media.type === "panel" ? (
              <DataPage waterData={waterData} />
            ) : (
              <MediasPage media={media} /> // Ajout d'un gestionnaire pour la fin des médias
            )}
          </div>
        ))
      ) : isTesting ? (
        <TestPage />
      ) : (
        <DataPage waterData={waterData} />
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

import _ from "lodash";
import { settingsService } from "../../../../services/SettingsService";
import { slideshowService } from "../../../../services/SlideshowService";

import { slideshowStatutsService } from "../../../../services/SlideshowStatutsService";
import "./Display.css";
import DataPage from "./pages/DataPage";
import MediasPage from "./pages/MediasPage";
import TestPage from "./pages/TestPage";

function Display({ waterData }) {

  const [isSettingMode, setIsSettingMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [settingRes, slideshowRes, slideshowStatusRes] =
        await Promise.all([
          settingsService.getSettings(),


          slideshowService.getSlideshow(),
          slideshowStatutsService.getSlideshowStatus()
        ]);
      setIsSettingMode(checkIsInSettingPeriod(settingRes[0]));
      const currentSlideshowId = slideshowStatusRes[0]?.slideshowId;
      if (slideshowStatusRes[0]?.isRunning) {
        const foundSlideshow = slideshowRes.data.slideshows.find(
          (slideshow) => slideshow.id === currentSlideshowId
        );
        if (foundSlideshow && foundSlideshow.media) {
          foundSlideshow.media.sort((a, b) => a.order - b.order);
        }


        // Vérifie si le diaporama actuel est le même que le précédent
        if (!_.isEqual(currentSlideshow, foundSlideshow)) {
          setCurrentSlideshow(foundSlideshow);
          setCurrentMediaIndex(0);
        }
      } else if (!_.isEmpty(currentSlideshow)) {
        // Si le diaporama n'est plus en cours, réinitialise currentSlideshow
        setCurrentSlideshow({});
      }
      if (slideshowStatusRes[0]?.isTesting) {
        setIsTesting(true);
      } else {
        setIsTesting(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [currentSlideshow]);

  useEffect(() => {

    const mediaInterval = setInterval(
      () => {
        setCurrentMediaIndex(
          (prevIndex) => (prevIndex + 1) % (currentSlideshow.media?.length || 1)
        );
      },
      currentSlideshow.media && currentSlideshow.media.length > 0
        ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
        : 5000
    );

    return () => clearInterval(mediaInterval);
  }, [currentSlideshow, currentMediaIndex]);

  const checkIsInSettingPeriod = (veilleData) => {
    if (!veilleData.enable) {
      return false;
    }
    const currentHour = new Date().getHours();
    const startHour = parseInt(veilleData.start);
    const stopHour = parseInt(veilleData.stop);
    return currentHour <= startHour && currentHour >= stopHour;
  };

  return (
    <div className="body" >
      {isTesting ? (<TestPage />) : (isSettingMode ? (
        <></>
      ) : currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media.id}
            style={{
              maxHeight: "212px",
              display: index === currentMediaIndex ? "block" : "none",
              maxWidth: "280px"

            }}
          >
            {media.type === "panel" ? (
              <DataPage waterData={waterData} />

            ) : (
              <MediasPage media={media} />
            )}
          </div>
        ))
      ) : (
        <DataPage waterData={waterData} />
      ))}
    </div>
  );
}

export default Display;

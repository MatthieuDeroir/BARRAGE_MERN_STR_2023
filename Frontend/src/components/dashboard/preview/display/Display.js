import React, { useEffect, useState } from "react";

import { slideshowService } from "../../../../services/SlideshowService";
import { settingsService } from "../../../../services/SettingsService";
import _ from "lodash";

import "./Display.css";
import MediasPage from "./pages/MediasPage";
import { slideshowStatutsService } from "../../../../services/SlideshowStatutsService";
import TestPage from "./pages/TestPage";
import DataPage from "./pages/DataPage";

function Display() {

  const [isSettingMode, setIsSettingMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [settingRes,  slideshowRes, slideshowStatusRes] =
        await Promise.all([
          settingsService.getSettings(),

          slideshowService.getSlideshow(),
          slideshowStatutsService.getSlideshowStatus(),
        ]);
        console.log(slideshowRes);
        console.log(slideshowStatusRes);
      setIsSettingMode(checkIsInSettingPeriod(settingRes[0]));
      console.log(isSettingMode);
      const currentSlideshowId = slideshowStatusRes[0]?.slideshowId;
      if (slideshowStatusRes[0]?.isRunning) {
        console.log("isRunning");
        const foundSlideshow = slideshowRes.data.slideshows.find(
          (slideshow) => slideshow.id === currentSlideshowId
        );
        console.log(foundSlideshow);
    

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
        console.log("isTesting");
      }else{
        setIsTesting(false);
        console.log("isNotTesting");
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
    console.log(currentHour, startHour, stopHour);
    console.log(currentHour >= startHour &&  currentHour <= stopHour);
    return currentHour >= startHour &&  currentHour <= stopHour;
  };

  return (
    <div className="body">
      {isTesting? (<TestPage/>):(isSettingMode ? (
       <></>
      ) : currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media.id}
            style={{
              maxHeight: "216px",
              display: index === currentMediaIndex ? "block" : "none",
              maxWidth: "228px"
             
            }}
          >
            {media.type === "panel" ? (
              <DataPage/>
             
            ) : (
              <MediasPage media={media} />
            )}
          </div>
        ))
      ) : (
        <DataPage/>
      ))}
    </div>
  );
}

export default Display;

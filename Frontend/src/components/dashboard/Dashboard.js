import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import Preview from "./preview/Preview";
import SlideshowList from "./slideshow/SlideshowList";
import SlideshowConfig from "./slideshow/SlideshowConfig";
import { slideshowService } from "../../services/SlideshowService";
import DataService from "../../services/DataService";
import DataBarrage from "./dataBarrage/DataBarrage";

function Dashboard() {
  const [slideshow, setSlideshow] = useState(null);
  const [slideshows, setSlideshows] = useState(null);
  const [dataBarrage, setdataBarrage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        getSlideshow();
        getData();
      } catch (error) {
        console.error("Erreur lors de la récupération du slideshow:", error);
      }
    }
    fetchData();
  }, [slideshow]);

  async function getData() {
    await DataService.getData().then((data) => {
      setdataBarrage(data[0]);
    });
  }
  async function getSlideshow() {
    await slideshowService.getSlideshow().then((data) => {
      setSlideshows(data.data.slideshows);
    });
  }

  async function setCurrentSlideshow(currentSlideshow) {
    setSlideshow(currentSlideshow);
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <DataBarrage dataBarrage={dataBarrage} />
      </Grid>
      <Grid item sm={6}>
        <Preview waterData={dataBarrage} />
      </Grid>
      <Grid item sm={3}>
        {slideshows && slideshow ? (
          <SlideshowConfig
            slideshow={slideshow}
            setSlideshow={setSlideshow}
            getSlideshow={getSlideshow}
            setCurrentSlideshow={setCurrentSlideshow}
          />
        ) : (
          <SlideshowList
            slideshows={slideshows}
            setSlideshows={setSlideshows}
            setSlideshow={setSlideshow}
            getSlideshow={getSlideshow}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Stack,
  Box,
  IconButton,
  Typography,
  Switch,
  Slider,
  CircularProgress,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import BugReportIcon from "@mui/icons-material/BugReport";
import PhoneIcon from "@mui/icons-material/Phone";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from "@mui/icons-material/DateRange";

import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";
import { useThemeMode } from "../../context/ThemeModeContext";
import { settingsService } from "../../services/SettingsService";
import { slideshowStatutsService } from "../../services/SlideshowStatutsService";

function Settings() {
  const [setting, setSetting] = useState({});
  const { themeMode, toggleTheme } = useThemeMode();
  const [modalOpen, setModalOpen] = useState(false);
  const [slideshowToPlay, setSlideshowToPlay] = useState({});
  useEffect(() => {
    slideshowStatutsService.getSlideshowStatus().then((data) => {
      console.log("data", data[0]);
      setSlideshowToPlay(data[0]);
    });
    settingsService
      .getSettings()
      .then((response) => {
        console.log("response", response);
        const settingData = response[0];
        if (settingData && settingData.start && settingData.stop) {
          setSetting({
            ...settingData,
            start: convertToSliderFormat(settingData.start),
            stop: convertToSliderFormat(settingData.stop),
          });
        } else {
          console.error("Les données de la setting ne sont pas définies");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  useEffect(() => {}, []);

  const convertToSliderFormat = (timeString) => {
    if (timeString && !isNaN(timeString)) {
      return Number(timeString);
    }
    return 0;
  };
  const handleSliderChange = (event, newValue) => {
    const date = new Date();
    const updatedSetting = {
      ...setting,
      start: newValue[0],
      stop: newValue[1],
      date: date.toString(),
    };

    setSetting(updatedSetting);
    settingsService.updateSetting(updatedSetting).then((response) => {});
  };

  const handleSettingChange = (event) => {
    const date = new Date();
    const updatedSetting = {
      ...setting,
      enable: event.target.checked ? true : false,
      date: date.toString(),
    };
    setSetting(updatedSetting);
    settingsService.updateSetting(updatedSetting).then((response) => {});
  };

  function playSlideshow(isTesting) {
    const date = new Date();
    const data = {
      slideshowId: slideshowToPlay.slideshowId,
      isRunning: false,
      isTesting: isTesting,
      date: date.toString(),
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }

  function updateDate(date) {
    const data = {
      date: date.toString(),
    };
    settingsService.updateDate(data).then((response) => {});
  }

  function stopSlideshow(isTesting) {
    const date = new Date();
    const data = {
      slideshowId: slideshowToPlay.slideshowId,
      isRunning: false,
      isTesting: isTesting,
      date: date.toString(),
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }

  function stopSlideshow(isTesting) {
    const data = {
      slideshowId: slideshowToPlay.slideshowId,
      isRunning: false,
      isTesting: isTesting,
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Paper className="mainPaperPage">
            <Stack className="herderTitlePage">
              <Box className="headerLeft">
                <IconButton disabled className="headerButton">
                  <SettingsIcon sx={{ color: "primary.light" }} />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary" }}
                  className="headerTitle"
                >
                  Paramètres
                </Typography>
              </Box>
            </Stack>
            <Box
              className="containerPage"
              sx={{
                paddingLeft: { xs: 2, sm: 6 },
                paddingRight: { xs: 2, sm: 6 },
              }}
            >
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <Stack spacing={2}>
                    <Stack
                      onClick={toggleTheme}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Stack spacing={3} direction="row" alignItems="center">
                        <IconButton disabled>
                          <DarkModeIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                        <Typography variant="h8" sx={{ color: "text.primary" }}>
                          Thème sombre
                        </Typography>
                      </Stack>
                      <Switch
                        checked={themeMode === "dark"}
                        color="secondary"
                      />
                    </Stack>
                    <Stack
                      onClick={() => {
                        const date = new Date();
                        updateDate(date);
                      }}
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      <IconButton>
                        <DateRangeIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        Update Date
                      </Typography>
                    </Stack>
                    <Stack
                      onClick={toggleModal}
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      <IconButton disabled>
                        <LockIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography
                        variant="h8"
                        sx={{
                          color: "text.primary",
                          textTransform: "none",
                          padding: "0",
                        }}
                      >
                        Changer mot de passe
                      </Typography>
                    </Stack>
                    <Stack
                      onClick={toggleTheme}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Stack spacing={3} direction="row" alignItems="center">
                        <IconButton disabled>
                          <BugReportIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                        <Typography variant="h8" sx={{ color: "text.primary" }}>
                          Test panneau
                        </Typography>
                      </Stack>
                      {slideshowToPlay.isTesting ? (
                        <IconButton
                          sx={{ p: 0 }}
                          size="big"
                          onClick={(e) => {
                            e.stopPropagation();
                            stopSlideshow(false);
                          }}
                        >
                          <StopIcon
                            sx={{ fontSize: 40, color: "secondary.main" }}
                          />
                          <CircularProgress
                            size={40}
                            sx={{
                              left: -0.5,
                              position: "absolute",
                              color: "secondary.main",
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            playSlideshow(true);
                          }}
                        >
                          <PlayArrowIcon
                            sx={{ fontSize: 30, color: "secondary.main" }}
                          />
                        </IconButton>
                      )}
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                      onClick={handleSettingChange}
                    >
                      <Stack spacing={3} direction="row" alignItems="center">
                        <IconButton disabled>
                          <ModeNightIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                        <Typography> Setting</Typography>
                      </Stack>
                      <Switch
                        color="secondary"
                        checked={setting.enable === true}
                        onChange={handleSettingChange}
                      />
                    </Stack>
                    <Stack>
                      <Slider
                        m={5}
                        color="secondary"
                        value={[setting.start, setting.stop]}
                        min={0}
                        max={24}
                        step={1}
                        marks={[
                          { value: 0, label: "0h" },
                          { value: 6, label: "6h" },
                          { value: 12, label: "12h" },
                          { value: 18, label: "18h" },
                          { value: 24, label: "24h" },
                        ]}
                        valueLabelDisplay="auto"
                        onChange={handleSliderChange}
                        disabled={setting.enable === false}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <IconButton disabled>
                        <PhoneIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        0123456789
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ChangePasswordDialog open={modalOpen} onClose={toggleModal} />
    </>
  );
}

export default Settings;

import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataService from "../../../services/DataService";
import { settingsService } from "../../../services/SettingsService";
import Display from "./display/Display";

function Preview({ waterData }) {
  const [isOnline1, setIsOnline1] = useState(false);
  const [isOn1, setIsOn1] = useState(false);
  const [isOnline2, setIsOnline2] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

  // Fetch les états de connexion au montage du composant
  useEffect(() => {
    const fetchSettingsAndSetStatus = async () => {
      try {
        // Récupérer les Datas using the dataService
        const data = await DataService.getData();
        console.log(data);

        setIsOnline1(data[0].client1Connected);
        setIsOnline2(data[0].client2Connected);

        console.log("Le client 1 est en ligne:", data[0].client1Connected);
        console.log("Le client 2 est en ligne:", data[0].client2Connected);
      } catch (error) {
        console.error("Erreur lors de la récupération des datas", error);
      }
      try {
        // Récupérer les paramètres using the settingsService
        const settings = await settingsService.getSettings();
        console.log(settings);
        const now = new Date();
        const startTime = new Date();
        const endTime = new Date();

        const startHour = settings[0].start;
        const stopHour = settings[0].stop;

        startTime.setHours(parseInt(startHour, 10));
        endTime.setHours(parseInt(stopHour, 10));

        let isActive = settings[0].enable && now <= startTime && now >= endTime;
        console.log("Le paramètre de veille est activé:", isActive);
        setIsOn1(isActive);
        setIsOn2(isActive);
      } catch (error) {
        console.error("Erreur lors de la récupération des paramètres", error);
      }
    };

    fetchSettingsAndSetStatus();

    // Définir un intervalle pour rafraîchir les données toutes les minutes (60000ms)
    const intervalId = setInterval(fetchSettingsAndSetStatus, 6000);

    // Fonction de nettoyage pour arrêter l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled>
              <VideoLabelIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Aperçu
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ ml: 4, mr: 4, mb: 2 }} />
        <Box className="containerPageNoScroll" style={{ height: "calc(94vh - 340px)" }} >
          <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
            <Display waterData={waterData} />
          </Box>
          <TableContainer sx={{ width: "100%" }}>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Écran</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        borderRadius: "100%",
                        border: isOnline1 ? "1px solid green" : "1px solid red",
                        width: 36,
                        height: 36,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">1</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        borderRadius: "100%",
                        border: isOnline2 ? "1px solid green" : "1px solid red",
                        width: 36,
                        height: 36,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">2</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>En Ligne</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isOnline1 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {isOnline1 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isOnline2 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {isOnline2 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>En Veille</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isOn1 ? "grey" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {isOn1 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isOn2 ? "grey" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {isOn2 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Preview;

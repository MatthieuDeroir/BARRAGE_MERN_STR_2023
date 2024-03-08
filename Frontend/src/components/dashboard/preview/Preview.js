import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import Display from "./display/Display";
import { useEffect } from "react";
import { settingsService } from "../../../services/SettingsService";
import DataService from "../../../services/DataService";

function Preview() {
  // État initial pour chaque écran
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

        console.log('Le client 1 est en ligne:', data[0].client1Connected);
        console.log('Le client 2 est en ligne:', data[0].client2Connected);
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

        const [startHour, startMinute] = settings[0].start.split(':');
        const [stopHour, stopMinute] = settings[0].stop.split(':');

        startTime.setHours(parseInt(startHour, 10), parseInt(startMinute, 10));
        endTime.setHours(parseInt(stopHour, 10), parseInt(stopMinute, 10));

        let isActive = settings[0].enable && now <= startTime && now >= endTime;
        console.log('Le paramètre de veille est activé:', isActive);

        setIsOn1(isActive);
        setIsOn2(isActive);
      } catch (error) {
        console.error("Erreur lors de la récupération des paramètres", error);
      }
    };

    fetchSettingsAndSetStatus();

    // Définir un intervalle pour rafraîchir les données toutes les minutes (60000ms)
    const intervalId = setInterval(fetchSettingsAndSetStatus, 60000);

    // Fonction de nettoyage pour arrêter l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  // Rendu d'une cellule d'état avec un cercle coloré et du texte
  const renderStatusCell = (isOnline, isOn) => (
    <>
      <Box
        sx={{
          width: 24,
          height: 24,
          bgcolor: isOnline ? "green" : "red",
          borderRadius: "50%",
          marginRight: 1,
        }}
      />
      <Typography variant="body2">
        {isOnline ? "En ligne" : "Hors ligne"}
      </Typography>
      <Box
        sx={{
          width: 24,
          height: 24,
          bgcolor: isOn ? "green" : "red",
          borderRadius: "50%",
          marginRight: 1,
        }}
      />
      <Typography variant="body2">{isOn ? "Allumé" : "Éteint"}</Typography>
    </>
  );

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <VideoLabelIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: "text.primary" }}
              className="headerTitle"
            >
              Aperçu
            </Typography>
          </Box>
        </Stack>
        <Box
          className="containerPage"
          sx={{
            p: { xs: 2, sm: 6 },
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Display />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Écran</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key="ecran1"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    En ligne
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: isOnline1 ? "green" : "red",
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: isOn1 ? "green" : "red",
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  key="ecran2"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Actif
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: isOnline2 ? "green" : "red",
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: isOn2 ? "green" : "red",
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    />
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

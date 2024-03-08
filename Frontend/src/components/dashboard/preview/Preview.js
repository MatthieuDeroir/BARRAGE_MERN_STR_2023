import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Container } from "@mui/material";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
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

      const startHour = settings[0].start;
      const stopHour = settings[0].stop

      startTime.setHours(parseInt(startHour, 10));
      endTime.setHours(parseInt(stopHour, 10));

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
  const intervalId = setInterval(fetchSettingsAndSetStatus, 6000);

  // Fonction de nettoyage pour arrêter l'intervalle lorsque le composant est démonté
  return () => clearInterval(intervalId);
}, []);


  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Grid item xs={12} md={8} lg={6}> {/* Ajustez les breakpoints selon le besoin */}
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton disabled>
                <VideoLabelIcon sx={{ color: "primary.light" }} />
              </IconButton>
              Aperçu
            </Typography>
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
              <Display waterData={waterData} />
            </Box>
            <TableContainer component={Box}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell sx={{color:"orange", fontWeight: 'bold' }} align="center">
  <Box sx={{ borderRadius: '50%', border: '1px solid orange', width: 'fit-content', padding: '5px' }}>
    <Typography variant="h5">1</Typography>
  </Box>
</TableCell>
<TableCell sx={{color:"orange",  fontWeight: 'bold'}} align="center">
  <Box sx={{ borderRadius: '50%', border: '1px solid orange', width: 'fit-content', padding: '5px' }}>
    <Typography variant="h5">2</Typography>
  </Box>
</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{fontWeight: 'bold' }}>En Ligne</TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: isOnline1 ? "green" : "red", fontWeight: 'bold' }}>
                        {isOnline1 ? "Oui" : "Non"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: isOnline2 ? "green" : "red", fontWeight: 'bold' }}>
                        {isOnline2 ? "Oui" : "Non"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontWeight: 'bold' }}>En Veille</TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: isOn1 ? "grey" : "black", fontWeight: 'bold' }}>
                        {isOn1 ? "Oui" : "Non"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: isOn2 ? "grey" : "black", fontWeight: 'bold' }}>
                        {isOn2 ? "Oui" : "Non"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default Preview;

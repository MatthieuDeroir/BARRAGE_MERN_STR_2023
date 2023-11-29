import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import WaterIcon from '@mui/icons-material/Water';
import React from "react";

function DataBarrage() {
  const currentDate = new Date();
  const lastUpdated = `Dernière mise à jour : ${currentDate.toLocaleDateString()} à ${currentDate.toLocaleTimeString()}`;

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <WaterIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                Données Barrage
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
           
            <Typography variant="h6" sx={{ color: "text.primary", marginTop: 2 }}>
              Débit entrant: 132.728 m³/s
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", marginTop: 2 }}>
              Débit sortant: 127.891 m³/s
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", marginTop: 2 }}>
              Côte du plan d'eau: 421.62 mNGF
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary", marginTop: 1 }}>
              {lastUpdated}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default DataBarrage;
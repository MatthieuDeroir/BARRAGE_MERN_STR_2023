import WaterIcon from "@mui/icons-material/Water";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import React from "react";

function DataBarrage({ dataBarrage }) {
  const currentDate = new Date();
  const lastUpdated = `Dernière mise à jour : ${currentDate.toLocaleDateString()} à ${currentDate.toLocaleTimeString()}`;

  return (
    <Grid >
      <Paper elevation={4}>
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
        <Divider sx={{ ml: 4, mr: 4 }} />
        <Box className="containerPageNoScroll" style={{ height: "calc(94vh - 550px)" }}>


          <Box display="flex" justifyContent="space-between" width="90%" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Débit entrant
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.debit_entrant} m³/s
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" width="90%" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Débit sortant
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.debit_sortant} m³/s
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" width="90%" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Côte du plan d'eau
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.cote_plan_eau} m
            </Typography>
          </Box>
          <Box>
            <Divider sx={{ my: 2 }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {lastUpdated}
          </Typography>
        </Box>

      </Paper>

    </Grid>
  );
}

export default DataBarrage;

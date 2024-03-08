import React from "react";
import { Box, Grid, IconButton, Typography, Card, CardContent, Divider } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";

function DataBarrage({ dataBarrage }) {
  const currentDate = new Date();
  const lastUpdated = `Dernière mise à jour : ${currentDate.toLocaleDateString()} à ${currentDate.toLocaleTimeString()}`;

  return (
    <Grid item xs={12}>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <IconButton disabled>
              <WaterIcon color="primary" />
            </IconButton>
            <Typography variant="h5" color="text.primary" marginLeft={2}>
              Données Barrage
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Débit entrant
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.debit_entrant} m³/s
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Débit sortant
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.debit_sortant} m³/s
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" my={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Côte du plan d'eau
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {dataBarrage?.cote_plan_eau} m
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="caption" color="text.secondary">
            {lastUpdated}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DataBarrage;

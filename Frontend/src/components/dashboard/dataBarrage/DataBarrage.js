import React from "react";
import { Box, Grid, IconButton, Typography, Card, CardContent, Divider, Container } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";

function DataBarrage({ dataBarrage }) {
  const currentDate = new Date();
  const lastUpdated = `Dernière mise à jour : ${currentDate.toLocaleDateString()} à ${currentDate.toLocaleTimeString()}`;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card elevation={4} sx={{ maxWidth: 600, width: '100%' }}> {/* Ajustez maxWidth selon vos besoins */}
    
        <CardContent>
          <Box display="flex" alignItems="center">
            <IconButton disabled className="headerButton">
                <WaterIcon sx={{ color: "primary.light" }} />
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
    </Container>
  );
}

export default DataBarrage;

import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import React from "react";

function DataBarrage({ dataBarrage }) {
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                Débit entrant
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                {dataBarrage && dataBarrage.debit_entrant} m³/s
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                Débit sortan
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                {dataBarrage && dataBarrage.debit_sortant} m³/s
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                Côte du plan
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "text.primary", marginTop: 2 }}
              >
                {dataBarrage && dataBarrage.cote_plan_eau} m
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", marginTop: 1 }}
            >
              {lastUpdated}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default DataBarrage;

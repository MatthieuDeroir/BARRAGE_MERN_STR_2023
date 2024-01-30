import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import IconButton from "@mui/material/IconButton";
import Display from "./display/Display";

function Preview() {
  // État initial pour chaque écran
  const [isOnline1, setIsOnline1] = useState(true);
  const [isOn1, setIsOn1] = useState(true);
  const [isOnline2, setIsOnline2] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

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
                    Allumé
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

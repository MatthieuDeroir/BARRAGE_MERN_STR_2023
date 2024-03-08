import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";

function Preview() {
  const [isOnline1, setIsOnline1] = useState(false);
  const [isOn1, setIsOn1] = useState(false);
  const [isOnline2, setIsOnline2] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

  // Supposons que vos hooks d'effet et la logique de fetch restent inchangés...

  return (
    <Grid item xs={12}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton disabled>
              <VideoLabelIcon color="primary" />
            </IconButton>
            Aperçu
          </Typography>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Écran</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>En ligne</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: isOnline1 ? "green" : "red" }}>
                      {isOnline1 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: isOnline2 ? "green" : "red" }}>
                      {isOnline2 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Actif</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: isOn1 ? "green" : "red" }}>
                      {isOn1 ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: isOn2 ? "green" : "red" }}>
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
  );
}

export default Preview;

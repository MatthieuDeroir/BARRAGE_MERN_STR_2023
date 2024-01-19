import React, { useState } from 'react';
import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";

function Preview() {
    const DISPLAY_URL = process.env.REACT_APP_DISPLAY_URL;

    // State declarations
    const [isOnline1, setIsOnline1] = useState(true);
    const [isOn1, setIsOn1] = useState(true);
    const [isOnline2, setIsOnline2] = useState(false);
    const [isOn2, setIsOn2] = useState(false);

    return (
        <>
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
                            paddingLeft: { xs: 2, sm: 6 },
                            paddingRight: { xs: 2, sm: 6 },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <iframe
                                src={DISPLAY_URL}
                                title="Preview"
                                style={{ border: "none", height: "240px", width: "480px" }}
                            ></iframe>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "text.primary" }}>
                                Écran 1
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: isOnline1 ? 'green' : 'red',
                                    borderRadius: '50%',
                                    marginRight: 1
                                }} />
                                <Typography variant="body2" sx={{ marginRight: 1 }}>
                                    {isOnline1 ? 'En ligne' : 'Hors ligne'}
                                </Typography>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: isOn1 ? 'green' : 'red',
                                    borderRadius: '50%',
                                    marginRight: 1
                                }} />
                                <Typography variant="body2">
                                    {isOn1 ? 'Allumé' : 'Éteint'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "text.primary" }}>
                                Écran 2
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: isOnline2 ? 'green' : 'red',
                                    borderRadius: '50%',
                                    marginRight: 1
                                }} />
                                <Typography variant="body2" sx={{ marginRight: 1 }}>
                                    {isOnline2 ? 'En ligne' : 'Hors ligne'}
                                </Typography>
                                <Box sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: isOn2 ? 'green' : 'red',
                                    borderRadius: '50%',
                                    marginRight: 1
                                }} />
                                <Typography variant="body2">
                                    {isOn2 ? 'Allumé' : 'Éteint'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
}

export default Preview;

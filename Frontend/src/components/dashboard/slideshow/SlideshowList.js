import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Container,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { slideshowService } from "../../../services/SlideshowService";
import AddSlideshowDialog from "../../dialogs/AddSlideshowDialog";
import { slideshowStatutsService } from "../../../services/SlideshowStatutsService";
import { useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSlideshowDialog from "../../dialogs/DeleteSlideshowDialog";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

function SlideshowList(props) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slideshowToDelete, setSlideshowToDelete] = useState({});
  const [slideshowToPlay, setSlideshowToPlay] = useState({});
  useEffect(() => {
    slideshowStatutsService.getSlideshowStatus().then((data) => {
      setSlideshowToPlay(data[0]);
    });
  }, []);

  async function AddSlideshow(name) {
    const data = { name: name };
    await slideshowService.createSlideshow(data).then((data) => {
      // Add media array to slideshow
      data.data.slideshow.media = [];

      props.setSlideshows([...props.slideshows, data.data.slideshow]);
      closeDialog();
    });
  }

  function openDeleteDialog(slideshow) {
    setDeleteDialogOpen(true);
    setSlideshowToDelete(slideshow);
  }

  async function deleteSlideshow(eventToDelete) {
    const data = { slideshowId: null, isRunning: false, isTesting: false };
    await slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
    await slideshowService.deleteSlideshow(eventToDelete.id).then((data) => {
      closeDialog();
      setSlideshowToDelete({});
      const updatedSlideshows = props.slideshows.filter(
        (slideshow) => slideshow.id !== slideshowToDelete.id
      );
      props.setSlideshows(updatedSlideshows);
    });
  }

  function closeDialog() {
    setDeleteDialogOpen(false);
    setAddDialogOpen(false);
  }

  function playSlideshow(slideshow) {
    const data = { slideshowId: slideshow.id, isRunning: true };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }
  function stopSlideshow(slideshow) {
    const data = {
      slideshowId: slideshow.id,
      isRunning: false,
      isTesting: false,
    };
    slideshowStatutsService.updateSlideshowStatus(data);
    setSlideshowToPlay(data);
  }

  return (
    <>
      <Grid item xs={12} md={12}>
        <Paper elevation={4}>
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <FolderIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                Diaporamas
              </Typography>
            </Box>
            <Box className="headerRight">
              <IconButton
                className="headerButton"
                onClick={() => {
                  setAddDialogOpen(true);
                }}
              >
                <AddIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            </Box>
          </Stack>
          {props.slideshows ? (
            <Box className="containerPage">
              {props.slideshows.map((slideshow) => (
                <Table key={slideshow.id}>
                  <TableBody>
                    <TableRow hover>
                      <TableCell
                        sx={{ p: 2, width: "80%", fontSize: "1.2rem" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          props.setSlideshow(slideshow);
                        }}
                      >
                        {slideshow.name}
                      </TableCell>

                      {slideshowToPlay.slideshowId === slideshow.id &&
                      slideshowToPlay.isRunning ? (
                        <TableCell sx={{ p: 0 }} align="right">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              stopSlideshow(slideshow);
                            }}
                          >
                            <StopIcon
                              sx={{ fontSize: 30, color: "secondary.main" }}
                            />
                            <CircularProgress
                              size={30}
                              sx={{
                                top: 8,
                                left: 8,
                                position: "absolute",
                                color: "secondary.main",
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell sx={{ p: 0, pr: 4 }} align="right">
                          <IconButton
                            sx={{
                              p: 0,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              playSlideshow(slideshow);
                            }}
                          >
                            <PlayArrowIcon
                              sx={{ fontSize: 30, color: "secondary.main" }}
                            />
                          </IconButton>
                        </TableCell>
                      )}
                      <TableCell sx={{ p: 0, pr: 2 }} align="right">
                        <IconButton
                          sx={{
                            p: 0,
                          }}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(slideshow);
                          }}
                        >
                          <DeleteIcon
                            sx={{ fontSize: 30, color: "secondary.main" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
            </Box>
          ) : (
            <Box className="infoPage">
              <Typography sx={{ color: "text.secondary" }}>
                Ajoutez un diaporama "+"
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      <DeleteSlideshowDialog
        open={deleteDialogOpen}
        onClose={closeDialog}
        onDelete={deleteSlideshow}
        slideshowToDelete={slideshowToDelete && slideshowToDelete}
      />
      <AddSlideshowDialog
        open={addDialogOpen}
        onClose={closeDialog}
        AddSlideshow={AddSlideshow}
      />
    </>
  );
}

export default SlideshowList;

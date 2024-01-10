import React, { useState } from "react";
import ImageConfiguration from "./ImageConfiguration";
import DataConfiguration from "./DataConfiguration";
import ModalWrapper from "./ModalWrapper";
import "./Slide.css";
import {
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar, ListItemSecondaryAction, ListItemText,
	styled,
	Typography
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { duration } from "@mui/material";

const Slide = ({ type, content, index, removeSlide }) => {
	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + "...";
		}
		return text;
	};

	if (!content) return null;
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<h4>{type} Slide</h4>
				{Array.isArray(content?.text) && (
					<div>
						{content.text.map((line, idx) => (
							<p key={idx} style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
								{truncateText(line, 10)}
							</p>
						))}
					</div>
				)}
			</div>
			{type === 'Image' && content?.imageUrl && (
				<div>
					<img src={content.imageUrl} alt="" style={{width: '100px', height: '100px'}} />
					<p>Durée : {content.duration} secondes</p>
				</div>
			)}
			{type === 'Data' && (
				<div>
					<p>Données : {content}</p>
					<p>Durée : {content.duration} secondes</p>
				</div>
			)}
			<button onClick={() => removeSlide(index)}>Remove</button>
		</div>
	);
};


const savePlaylistToLocalStorage = (slides) => {
	localStorage.setItem("playlistConfig", JSON.stringify(slides));

};


const loadPlaylistFromLocalStorage = () => {
	const storedData = localStorage.getItem("playlistConfig");
	return storedData ? JSON.parse(storedData) : [];
};

export default function PlaylistConfiguration() {
	const [slides, setSlides] = useState(loadPlaylistFromLocalStorage());
	const [modalOpen, setModalOpen] = useState(false);
	const [currentConfigType, setCurrentConfigType] = useState(null);

	const addSlide = (type) => {
		setCurrentConfigType(type);
		setModalOpen(true);
	};

	const closeModal = () => {
		setCurrentConfigType(null);
		setModalOpen(false);
	};

	const saveSlide = (content, duration) => {
		const slide = {
			type: currentConfigType,
			content: content,
			duration: duration,
		};
		setSlides((prevSlides) => {
			const newSlides = [...prevSlides, slide];
			savePlaylistToLocalStorage(newSlides);
			return newSlides;
		});
		closeModal();
	};

	const removeSlide = (index) => {
		setSlides((prevSlides) => {
			const newSlides = [...prevSlides];
			newSlides.splice(index, 1);
			savePlaylistToLocalStorage(newSlides);
			return newSlides;
		});
	};

	const renderConfigContent = () => {
		switch (currentConfigType) {
		case 'Image':
			return <ImageConfiguration saveSlide={saveSlide} />;
		case 'Data':
			return <DataConfiguration saveSlide={saveSlide} />;
		default:
			return null;
		}
	};

	const Demo = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}));

	const moveSlideUp = (index) => {
		if (index > 0) {
			setSlides((prevSlides) => {
				const newSlides = [...prevSlides];
				const temp = newSlides[index - 1];
				newSlides[index - 1] = newSlides[index];
				newSlides[index] = temp;
				savePlaylistToLocalStorage(newSlides);
				return newSlides;
			});
		}
	};

	const moveSlideDown = (index) => {
		if (index < slides.length - 1) {
			setSlides((prevSlides) => {
				const newSlides = [...prevSlides];
				const temp = newSlides[index + 1];
				newSlides[index + 1] = newSlides[index];
				newSlides[index] = temp;
				savePlaylistToLocalStorage(newSlides);
				return newSlides;
			});
		}
	};

	const generate = () => {
		return (
			<>
				{slides.map((slide, index) => (
					<ListItem key={index} secondaryAction={
						<>
							<IconButton edge="end" aria-label="move-up" onClick={() => moveSlideUp(index)}>
								<ArrowUpwardIcon />
							</IconButton>
							<IconButton edge="end" aria-label="move-down" onClick={() => moveSlideDown(index)}>
								<ArrowDownwardIcon />
							</IconButton>
							<IconButton edge="end" aria-label="delete" onClick={() => removeSlide(index)}>
								<DeleteIcon />
							</IconButton>
						</>
					}>
						<ListItemAvatar>
							<Avatar>
								<FolderIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`Slide ${index + 1}`} secondary={slide.type} />
						{slide.type === 'Image' && (
							<ListItemSecondaryAction>
								<img src={slide.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '100px', height: 'auto' }} />
							</ListItemSecondaryAction>
						)}
						{slide.type === 'Data' && (
							<ListItemSecondaryAction>
								<Typography>{slide.data}</Typography>
							</ListItemSecondaryAction>
						)}
					</ListItem>
				))}
			</>
		);
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return; // Item dropped outside of droppable area
		const { source, destination } = result;
		const newSlides = Array.from(slides);
		const [removed] = newSlides.splice(source.index, 1);
		newSlides.splice(destination.index, 0, removed);
		setSlides(newSlides);
	};

	return (
		<div>
			<Typography variant="h3">Playlist Configuration</Typography>
			<Button variant="contained" onClick={() => addSlide('Image')}>Add Image</Button>
			<Button variant="contained" onClick={() => addSlide('Data')}>Add Data</Button>


			<Grid item xs={12} md={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
					Playlist Configuration
				</Typography>
				<List dense>
					{generate()}
				</List>
			</Grid>


			<ModalWrapper isOpen={modalOpen} onClose={closeModal}>
				{renderConfigContent()}
				<Button onClick={closeModal}>Cancel</Button>
			</ModalWrapper>
		</div>
	);
}


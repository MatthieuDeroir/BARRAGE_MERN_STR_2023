import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function DataConfiguration({ saveSlide }) {
	const [duration, setDuration] = useState(0);
	const [content] = useState(['Data 1', 'Data 2', 'Data 3']); // Simulate fetched data

	const handleDurationChange = (e) => {
		setDuration(parseInt(e.target.value));
	};

	const saveAndExit = () => {
		saveSlide({ type: 'Data', content, duration });
	};

	return (
		<div>
			<Typography variant="h3">Data Configuration</Typography>
			<Typography>Preview of data fetched from the external database</Typography>
			<label>Duration (seconds):</label>
			<input type="number" value={duration} onChange={handleDurationChange} />
			<Button onClick={saveAndExit}>Save and Exit</Button>
		</div>
	);
}

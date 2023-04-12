import React from "react";

export default function ModeSelector(props) {
    // return 4 buttons with the following text: "Text", "Image", "Data", "Playlist"
    // each button should have an onClick event that calls the function props.onModeChange
    // with the text of the button as the argument

    return (
        <div>
            <button onClick={() => props.setSelectedMode("text")}>Text</button>
            <button onClick={() => props.setSelectedMode("image")}>Image</button>
            <button onClick={() => props.setSelectedMode("data")}>Data</button>
            <button onClick={() => props.setSelectedMode("playlist")}>Playlist</button>
        </div>
    );
}
import React, { useState } from 'react';
import apiService from '../services/apiService'; // Import the apiService

const TextInput = ({ onTextSubmit }) => {
    const [text, setText] = useState('');

    // Update state when text changes
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    // Submit text
    // Submit text
    const handleSubmit = () => {
        onTextSubmit(text); // Pass the text to onTextSubmit
    };


    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here..."
            />
            <button onClick={handleSubmit} disabled={!text}>
                Analyze Text
            </button>
        </div>
    );
};

export default TextInput;

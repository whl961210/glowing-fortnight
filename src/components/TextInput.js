import React, { useState } from 'react';
import './TextInput.css'; // Import the CSS file

const TextInput = ({ onTextSubmit }) => {
    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        onTextSubmit(text);
    };

    return (
        <div className="text-input-container">
            <textarea
                className="text-input-area"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here..."
            />
            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!text}
            >
                Analyze Text
            </button>
        </div>
    );
};

export default TextInput;

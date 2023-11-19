// FileUploader.js
import React, { useState } from 'react';
import './FileUploader.css';

const FileUploader = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [columnName, setColumnName] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle column name input
    const handleColumnNameChange = (event) => {
        setColumnName(event.target.value);
    };

    // Handle file upload
    const handleUpload = async () => {
        onFileUpload(selectedFile, columnName);
    };

    return (
        <div className="file-uploader-container">
            <input
                type="file"
                className="file-input"
                onChange={handleFileChange}
            />
            <input
                type="text"
                className="column-name-input"
                placeholder="Column name"
                value={columnName}
                onChange={handleColumnNameChange}
            />
            <button
                className="upload-button"
                onClick={handleUpload}
                disabled={!selectedFile || !columnName}
            >
                Upload File
            </button>
        </div>
    );
};

export default FileUploader;
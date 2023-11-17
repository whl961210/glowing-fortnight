// FileUploader.js
import React, { useState } from 'react';

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
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Column name" value={columnName} onChange={handleColumnNameChange} />
            <button onClick={handleUpload} disabled={!selectedFile || !columnName}>
                Upload File
            </button>
        </div>
    );
};

export default FileUploader;
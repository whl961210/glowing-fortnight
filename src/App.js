import React, { useState } from 'react';
import TextInput from './components/TextInput';
import FileUploader from './components/FileUploader';
import ResultsTable from './components/ResultsTable';
import YouTubeCommentAnalyzer from './components/YouTubeCommentAnalyzer';
import apiService from './services/apiService';

function App() {
    const [results, setResults] = useState([]);

    const handleTextSubmit = async (text) => {
        try {
            const response = await apiService.analyzeText(text);
            setResults([response]);
        } catch (error) {
            console.error('Error analyzing text:', error);
            // Handle error appropriately
        }
    };

    const handleAnalyzeYouTubeComments = async (videoId) => {
        try {
            const response = await apiService.analyzeYouTubeComments(videoId);
            setResults(response);
        } catch (error) {
            console.error('Error analyzing YouTube comments:', error);
            // Handle error appropriately
        }
    };
    const handleFileUpload = async (file, columnName) => {
      try {
          const response = await apiService.uploadFile(file, columnName);
          setResults(response);
      } catch (error) {
          console.error('Error uploading file:', error);
          // Handle error appropriately
      }
  };

    return (
        <div>
            <h1>Sentiment Analysis</h1>
            <TextInput onTextSubmit={handleTextSubmit} />
            <FileUploader onFileUpload={handleFileUpload} />
            <YouTubeCommentAnalyzer onAnalyzeYouTubeComments={handleAnalyzeYouTubeComments} />
            <ResultsTable results={results} />
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import TextInput from './components/TextInput';
import FileUploader from './components/FileUploader';
import ResultsTable from './components/ResultsTable';
import YouTubeCommentAnalyzer from './components/YouTubeCommentAnalyzer';
import apiService from './services/apiService';

function App() {
    const [results, setResults] = useState([]);
    const [sentimentPercentages, setSentimentPercentages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTextSubmit = async (text) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await apiService.analyzeText(text);
            setResults([response]);
        } catch (error) {
            console.error('Error analyzing text:', error);
            setError('Error analyzing text');
        }
        setIsLoading(false);
    };

    const handleAnalyzeYouTubeComments = async (videoId) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await apiService.analyzeYouTubeComments(videoId);
            const sentiments = response.map((comment) => comment.Sentiment);
            setResults(response);
            console.log(sentiments);
            const percentages = await apiService.calculateSentimentPercentages(sentiments);
            console.log(percentages);
            setSentimentPercentages(percentages);
            console.log("Updated State:", percentages);
        } catch (error) {
            console.error('Error analyzing YouTube comments:', error);
            setError('Error analyzing YouTube comments');
        }
        setIsLoading(false);
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
        {error && <div className="error-message">{error}</div>}
        {isLoading ? <div>Loading...</div> : (
            <>
                <TextInput onTextSubmit={handleTextSubmit} />
                <FileUploader onFileUpload={handleFileUpload} />
                <YouTubeCommentAnalyzer onAnalyzeYouTubeComments={handleAnalyzeYouTubeComments} />
                <ResultsTable results={results} sentimentPercentages={sentimentPercentages} />
            </>
        )}
    </div>
);

}

export default App;

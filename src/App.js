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
            const analyzedCommentsResponse = await apiService.analyzeYouTubeComments(videoId);
            setResults(analyzedCommentsResponse.comments);  // Assuming the response has a 'comments' key

            const sentiments = analyzedCommentsResponse.comments.map(comment => comment.Sentiment);
            const sentimentPercentagesResponse = await apiService.calculateSentimentPercentages(sentiments);
            setSentimentPercentages(sentimentPercentagesResponse.sentiment_percentages); // Assuming the response has a 'sentiment_percentages' key
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
                <ResultsTable results={results} />

                {/* Display sentiment percentages */}
                <div>
                    <h2>Sentiment Percentages</h2>
                    {Object.keys(sentimentPercentages).length > 0 && (
                        <ul>
                            {Object.entries(sentimentPercentages).map(([sentiment, percentage]) => (
                                <li key={sentiment}>
                                    {`${sentiment}: ${percentage.toFixed(2)}%`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </>
        )}
    </div>
);

}

export default App;

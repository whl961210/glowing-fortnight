import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styling
import TextInput from './components/TextInput';
import FileUploader from './components/FileUploader';
import ResultsTable from './components/ResultsTable';
import YouTubeCommentAnalyzer from './components/YouTubeCommentAnalyzer';
import apiService from './services/apiService';
import './App.css'; // Your custom styles

function App() {
    const [results, setResults] = useState([]);
    const [selectedColumnName, setSelectedColumnName] = useState('');
    const [sentimentPercentages, setSentimentPercentages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const hasSentimentData = sentimentPercentages && Object.keys(sentimentPercentages).length > 0;
    const MAX_RESULTS_DISPLAY = 500;
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
            setSelectedColumnName(columnName);
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error appropriately
        }
    };
    const handleExportCsv = async () => {
        try {
            await apiService.exportCsv(results);
        } catch (error) {
            console.error('Error exporting CSV:', error);
            setError('Error exporting CSV');
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Sentiment Analysis</h1>
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <>
                    <Tabs>
                        <TabList>
                            <Tab>Text Analysis</Tab>
                            <Tab>File Upload</Tab>
                            <Tab>YouTube Comments</Tab>
                        </TabList>

                        <TabPanel>
                            <TextInput onTextSubmit={handleTextSubmit} />
                        </TabPanel>
                        <TabPanel>
                            <FileUploader onFileUpload={handleFileUpload} />
                        </TabPanel>
                        <TabPanel>
                            <YouTubeCommentAnalyzer onAnalyzeYouTubeComments={handleAnalyzeYouTubeComments} />
                        </TabPanel>
                    </Tabs>

                    {/* Conditional rendering based on the size of results */}
                    {results.length > MAX_RESULTS_DISPLAY ? (
                        <div className="large-data-warning">
                            <p>Data too large to display. Please download the CSV file.</p>
                            <button className="export-button" onClick={handleExportCsv}>
                                Download CSV
                            </button>
                        </div>
                    ) : (
                        <div className="results-container">
                            <ResultsTable results={results} columnName={selectedColumnName} />

                            {results.length > 0 && (
                                <button className="export-button" onClick={handleExportCsv}>
                                    Export as CSV
                                </button>
                            )}

                            {hasSentimentData && (
                                <div className="sentiment-results">
                                    <h2>Sentiment Results:</h2>
                                    <ul>
                                        {Object.entries(sentimentPercentages).map(([key, value]) => (
                                            <li key={key}>
                                                {value.Negative && <span> Negative: {Number(value.Negative).toFixed(2)}% </span>}
                                                {value.Positive && <span> Positive: {Number(value.Positive).toFixed(2)}% </span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}



export default App;

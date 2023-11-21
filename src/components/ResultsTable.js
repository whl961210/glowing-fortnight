import React, { useState } from 'react';
import './ResultsTable.css';
import apiService from '../services/apiService';

const ResultsTable = ({ results, sentimentPercentages }) => {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [userSentiment, setUserSentiment] = useState('');
    const [userComment, setUserComment] = useState('');
    if (!results || results.length === 0) {
        return <p>No results to display.</p>;
    }
    console.log("Results:", results);
    console.log("Sentiment Percentages:", sentimentPercentages);
    // Extract keys from the first result object
    const keys = Object.keys(results[0]);
    const handleFeedbackSubmit = async () => {
        if (!selectedEntry) {
            alert('Please select an entry to submit feedback');
            return;
        }
        try {
            await apiService.submitUserFeedback(selectedEntry.text, userSentiment, userComment); // Assuming 'text' is a key
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback');
        }
    };

    return (
        <div className="results-table-container">
            <div className="table-scrollable">
                <table>
                    <thead>
                        <tr>
                            {keys.map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr
                                key={index}
                                onClick={() => setSelectedEntry(result)}
                                className={selectedEntry === result ? 'selected-row' : ''}
                            >
                                {keys.map((key) => (
                                    <td key={key}>{result[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className="feedback-form">
                <h3>Make Correction If You Thinks the Result is Off</h3>
                <textarea
                    placeholder="Enter your comment"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                />
                <select value={userSentiment} onChange={(e) => setUserSentiment(e.target.value)}>
                    <option value="">Select Sentiment</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                </select>
                <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
            </div>
            {sentimentPercentages && (
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
    );

};

export default ResultsTable;

import React from 'react';
import './ResultsTable.css';

const ResultsTable = ({ results, sentimentPercentages }) => {
    if (!results || results.length === 0) {
        return <p>No results to display.</p>;
    }
    console.log("Results:", results);
    console.log("Sentiment Percentages:", sentimentPercentages);
    // Extract keys from the first result object
    const keys = Object.keys(results[0]);

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
                            <tr key={index}>
                                {keys.map((key) => (
                                    <td key={key}>{result[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
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

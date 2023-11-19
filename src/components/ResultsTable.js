import React from 'react';

const ResultsTable = ({ results, sentimentPercentages }) => {
    if (!results || results.length === 0) {
        return <p>No results to display.</p>;
    }

    // Extract keys from the first result object
    const keys = Object.keys(results[0]);

    return (
        <div>
            <div style={{ overflow: 'auto', maxHeight: '500px' }}>
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
            {/* Display sentiment percentages */}
            {sentimentPercentages && Object.keys(sentimentPercentages).length > 0 && (
                <div>
                    <p>Positive: {sentimentPercentages.Positive}%</p>
                    <p>Negative: {sentimentPercentages.Negative}%</p>
                </div>
            )}

        </div>
    );
};

export default ResultsTable;

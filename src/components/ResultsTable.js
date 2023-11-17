import React from 'react';

const ResultsTable = ({ results }) => {
    if (!results || results.length === 0) {
        return <p>No results to display.</p>;
    }

    // Extract keys from the first result object
    const keys = Object.keys(results[0]);

    return (
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
    );
};

export default ResultsTable;
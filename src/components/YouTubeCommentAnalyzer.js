import React, { useState } from 'react';
import './YouTubeCommentAnalyzer.css';

const YouTubeCommentAnalyzer = ({ onAnalyzeYouTubeComments }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const extractVideoID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] || match[2] : null;
    };

    const handleAnalyze = async () => {
        setError(''); // Reset error message
        const videoId = extractVideoID(videoUrl);
        if (videoId) {
            onAnalyzeYouTubeComments(videoId);
        } else {
            setError('Please enter a valid YouTube video URL.');
        }
    };

    return (
        <div className="youtube-analyzer-container">
            <input
                type="text"
                placeholder="Enter YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={`youtube-input ${error ? 'input-error' : ''}`}
            />
            <button 
                className="analyze-button"
                onClick={handleAnalyze} 
                disabled={!videoUrl}
            >
                Analyze Comments
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default YouTubeCommentAnalyzer;

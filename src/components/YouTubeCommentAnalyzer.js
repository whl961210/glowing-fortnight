import React, { useState } from 'react';

const YouTubeCommentAnalyzer = ({ onAnalyzeYouTubeComments }) => {
    const [videoId, setVideoId] = useState('');

    const handleVideoIdChange = (event) => {
        setVideoId(event.target.value);
    };

    const handleAnalyze = async () => {
        if (videoId) {
            onAnalyzeYouTubeComments(videoId);
        } else {
            alert('Please enter a YouTube video ID.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter YouTube Video ID"
                value={videoId}
                onChange={handleVideoIdChange}
            />
            <button onClick={handleAnalyze} disabled={!videoId}>
                Analyze Comments
            </button>
        </div>
    );
};

export default YouTubeCommentAnalyzer;

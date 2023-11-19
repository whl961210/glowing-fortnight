import React, { useState } from 'react';

const YouTubeCommentAnalyzer = ({ onAnalyzeYouTubeComments }) => {
    const [videoUrl, setVideoUrl] = useState('');

    const extractVideoID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleAnalyze = async () => {
        const videoId = extractVideoID(videoUrl);
        if (videoId) {
            onAnalyzeYouTubeComments(videoId);
        } else {
            alert('Please enter a valid YouTube video URL.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button onClick={handleAnalyze} disabled={!videoUrl}>
                Analyze Comments
            </button>
        </div>
    );
};

export default YouTubeCommentAnalyzer;

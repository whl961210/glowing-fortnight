import axios from 'axios';

const API_BASE_URL = 'https://sentiment-backend-5zi9.onrender.com';

const apiService = {
    analyzeText: async (text) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/analyze-text`, { text });
            return response.data;
        } catch (error) {
            console.error('Error analyzing text:', error);
            throw error;
        }
    },

    uploadFile: async (file, columnName) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('column_name', columnName);

        try {
            const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },
    analyzeYouTubeComments: async (videoId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/analyze-youtube-comments`, { video_id: videoId });
            return response.data;
        } catch (error) {
            console.error('Error analyzing YouTube comments:', error);
            throw error;
        }
    },
    submitUserFeedback: async (originalText, userSentiment, userComment) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/submit-feedback`, {
                original_text: originalText,
                user_sentiment: userSentiment,
                user_comment: userComment
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting user feedback:', error);
            throw error;
        }
    },
    
    getFeedback: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-feedback`);
            return response.data;
        } catch (error) {
            console.error('Error getting feedback:', error);
            throw error;
        }
    },

    deleteFeedback: async (feedbackId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete-feedback/${feedbackId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting feedback with ID ${feedbackId}:`, error);
            throw error;
        }
    },
    
    calculateSentimentPercentages: async (sentiments) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/calculate-sentiment-percentages`, { sentiments });
            return response.data;
        } catch (error) {
            console.error('Error calculating sentiment percentages:', error);
            throw error;
        }
    },
};

export default apiService;
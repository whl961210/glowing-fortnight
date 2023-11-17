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
};

export default apiService;
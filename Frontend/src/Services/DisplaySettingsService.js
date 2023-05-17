const BASE_URL = 'http://localhost:5000/api/displaysettings';

export const getDisplaySettings = async () => {
    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error('Error getting display settings:', error);
        throw error;
    }
};

export const createDisplaySetting = async (data) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating display setting:', error);
        throw error;
    }
};

export const updateDisplaySetting = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating display setting:', error);
        throw error;
    }
};

export const deleteDisplaySetting = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting display setting:', error);
        throw error;
    }
};

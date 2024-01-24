const API_URL = process.env.REACT_APP_API_URL;
class DataService {
  getData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/data`);
      return await response.json();
    } catch (error) {
      console.error("Error getting display settings:", error);
      throw error;
    }
  };

  postData = async (data) => {
    try {
      const response = await fetch(`${API_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating display setting:", error);
      throw error;
    }
  };

  putData = async (id, data) => {
    try {
      const response = await fetch(`${`${API_URL}/api/data`}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating display setting:", error);
      throw error;
    }
  };

  deleteData = async (id) => {
    try {
      const response = await fetch(`${`${API_URL}/api/data`}/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting display setting:", error);
      throw error;
    }
  };
}

export default new DataService();

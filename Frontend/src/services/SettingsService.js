import { api } from "../helpers/api";

const API_URL = process.env.REACT_APP_API_URL;

export const settingsService = {
  getSettings,
  updateSetting,
  updateDate,
};

function getSettings() {
  return api
    .fetchWithAuthorization(`${API_URL}/api/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateSetting(settingsToUpdate) {
  return api
    .fetchWithAuthorization(`${API_URL}/api/settings/${settingsToUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settingsToUpdate),
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateDate(date) {
  
  return api
    .fetchWithAuthorization(`${API_URL}/api/settings/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    })
    .then(handleResponse)
    .catch(handleError);
} 

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y avait un problème avec l'opération fetch :", error);
}
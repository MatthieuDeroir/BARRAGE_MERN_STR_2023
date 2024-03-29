class Api {
  async fetchWithAuthorization(url, options) {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    const headers = new Headers(options.headers || {});

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(url, {
      ...options,
      headers: headers,
    });

    // Vérifiez le statut de la réponse
    if (response.status === 401) {
      localStorage.removeItem("token");
      // Redirigez l'utilisateur vers la page de connexion ou effectuez toute autre action appropriée
      window.location.reload();
    }


    return response;
  }
}

export const api = new Api();

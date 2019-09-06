const API_URL: string = "http://localhost:8080/resources/api/";

function callApi(endpoint: string): Promise<string> {
  const url: string = API_URL + endpoint;
  const options: RequestInit = {
    method: "GET"
  };

  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Failed to load");
      }
    })
    .catch(error => {
      throw error;
    });
}

export { callApi };

// create module for all the fetch
// import.meta.env.VITE_API_URL is the URL of the API, which is defined in the .env file to avoid hardcoding the URL in the code.
// the fetch function returns a promise that resolves to the response object from the server.

export function fetchCars() {
    return fetch(import.meta.env.VITE_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch: " + response.statusText);
            }
            return response.json();
        })
}

export function deleteCar(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in delete: " + response.statusText);
            }
            return response.json();
        })
}
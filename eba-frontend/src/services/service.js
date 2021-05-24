//Function to fetch all booking
export function fetchAllBookings() {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
     return fetch("/api/buchungen/all", requestOptions)
        .then(response => response.json())
}

export function fetchAllAccounts() {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("/api/konten/all", requestOptions)
        .then(response => response.json())
}
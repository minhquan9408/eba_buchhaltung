//Function to fetch all booking
export function fetchAllBookings() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch("http://127.0.0.1:5000/api/buchungen/all", requestOptions)
    .then(response => response.json())
}

export function fetchAllAccounts() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch("http://127.0.0.1:5000/api/konten/all", requestOptions)
    .then(response => response.json())
}
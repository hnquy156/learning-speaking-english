const options = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    ...options,
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteData(url = '', data = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'DELETE',
    body: JSON.stringify(data),
  });
  return response.json();
}

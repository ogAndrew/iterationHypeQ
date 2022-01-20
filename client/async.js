export async function fetchMedia() {
  const response = await fetch('http://localhost:3000/api/');
  const mediaResults = await response.json(response);
  console.log('mediaResults', mediaResults);
  return mediaResults;
}

export async function addMediaToDb(userMedia) {
  const response = await fetch('http://localhost:3000/api', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMedia),
  });
  const mediaDbResult = await response.json(response);
  return mediaDbResult;
}


export async function updateMedia(id, formData) {
  const response = await fetch(`http://localhost:3000/api/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // list needs be changed to data from editForm in Card.js
    body: JSON.stringify(formData),
  });
  const updatedMediaResult = await response.json(response);
  console.log('updatedMediaResult', updatedMediaResult);
  return updatedMediaResult;
}


export async function deleteMedia(id) {
  const response = await fetch(`http://localhost:3000/api/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  return response;
}

//LOGIN/SIGNUP
export async function addSignup(userSignup) {
  const response = await fetch('http://localhost:3000/user/signup', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userSignup),
  });
  const addedUser = await response.json(response);
  console.log(addedUser)
  return addedUser; 
}

export async function getLogin(userLogin) {
  const response = await fetch('http://localhost:3000/user/login', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  });
  const userObject = await response.json();
  console.log(userObject)
  return userObject; 
}
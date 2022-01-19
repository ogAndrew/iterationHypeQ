export async function fetchMedia() {
  const response = await fetch('http://localhost:3000/api/');
  const mediaResults = await response.json(response);
  console.log(mediaResults);
  return mediaResults;
}

export async function addMediaToDb(userMedia) {
  const response = await fetch('http://localhost:3000/', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMedia),
  });
  const mediaDbResult = await response.json(response);
  console.log('mediaResult', mediaDbResult);
  return mediaDbResult;
}


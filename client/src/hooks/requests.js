let API_URL = "http://localhost:8000/v1";

// Load planets and return as JSON.
async function httpGetPlanets() {
  let response = await fetch(`${API_URL}/planets`);
  let result = await response.json();
  //console.log(result)
  return result;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  let response = await fetch(`${API_URL}/launches`);
  let fetchedLaunches = await response.json();
  fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
  console.log(fetchedLaunches);
  return fetchedLaunches;
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok :false
    }    
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
      });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

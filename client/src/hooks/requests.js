async function httpGetPlanets() {
  const response = await fetch("http://localhost:8000/planets");
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch("http://localhost:8000/launches");
  return await response.json();
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch("http://localhost:8000/launches", {
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`http://localhost:8000/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

// fetch data from API 1
function fetchDataFromAPI1() {
  return fetch('https://ubi-engines.azurewebsites.net/api/orchestrators/Engines')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
      throw error; // Rethrow the error to be handled later
    });
}

// fetch data from API 1 and display it
fetchDataFromAPI1()
  .then(data => {
    console.log(data);
    displayEngines(data);
  })
  .catch((error) => console.error("FETCH ERROR:", error));

// fetch data from API 2
function fetchDataFromAPI2() {
  return fetch('https://ubi-interview.azurewebsites.net/api/orchestrators/workstations')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
      throw error; 
    });
}

// fetch data from API 2 and display it
fetchDataFromAPI2()
  .then(data => {
    console.log(data);
    displayWorkstations(data);
  })
  .catch((error) => console.error("FETCH ERROR:", error));

// Display engines
function displayEngines(data) {
  const engineDiv = document.getElementById("engine");

  // Loop through the array of engines
  data.forEach((engine, index) => {
    // Create an unordered list for each engine's data
    const engineList = document.createElement("ul");
    // Create a container div for each engine
    const engineContainer = document.createElement("div");
    engineContainer.style.border = "2px solid black";
    engineContainer.style.padding = "5px";
    engineContainer.style.justifycontent = "space-between";
    // ID
    const engineIdLi = document.createElement("li");
    engineIdLi.innerHTML = `ID: ${engine.id}`;
    engineList.appendChild(engineIdLi);

    // Serial Number
    const engineSNLi = document.createElement("li");
    engineSNLi.innerHTML = `Serial Number: ${engine.serialNumber}`;
    engineList.appendChild(engineSNLi);

    // Model
    const engineModelLi = document.createElement("li");
    engineModelLi.innerHTML = `Model: ${engine.model}`;
    engineList.appendChild(engineModelLi);

    // Image
    const engineImg = document.createElement("img");
    engineImg.src = engine.image;
    engineContainer.appendChild(engineImg);

    // Append the unordered list and image to the engine container
    engineContainer.appendChild(engineList);

    // Append the engine container to the engineDiv
    engineDiv.appendChild(engineContainer);
  });
}

// Display workstations
function displayWorkstations(data) {
  const workstationDiv = document.getElementById("workstation");

  // Loop through the array of workstations
  data.forEach((workstation, index) => {
    // Create a div for each workstation
    const workstationDivItem = document.createElement("div");
    workstationDivItem.style.border = "2px solid black";
    workstationDivItem.style.padding = "5px";
    workstationDivItem.style.align = "center";
    // Name
    const nameHeading = document.createElement("h1");
    nameHeading.innerHTML = `Workstation Name: ${workstation.name}`;
    workstationDivItem.appendChild(nameHeading);

    // Cycle Time
    const cycleTimeHrs = workstation.cycleTimeHrs;
    const cycleTimeP = document.createElement("p");
    cycleTimeP.innerHTML = `Cycle Time (hours): ${cycleTimeHrs}`;
    workstationDivItem.appendChild(cycleTimeP);

    // Current Product
    const currentProduct = workstation.currentProduct;
    const currentProductP = document.createElement("p");
    if (currentProduct) {
      currentProductP.innerHTML = `Current Product ID: ${currentProduct.id}`;
    } else {
      currentProductP.innerHTML = `Current Product: N/A`;
    }
    workstationDivItem.appendChild(currentProductP);

    // ID
    const workstationID = workstation.id;
    const workstationIdP = document.createElement("p");
    workstationIdP.innerHTML = `Workstation ID: ${workstationID}`;
    workstationDivItem.appendChild(workstationIdP);

    // Entry Time
    const entryTime = workstation.entryTime;
    const entryTimeP = document.createElement("p");
    entryTimeP.innerHTML = `Entry Time: ${entryTime}`;
    workstationDivItem.appendChild(entryTimeP);

    workstationDiv.appendChild(workstationDivItem);
  });
}

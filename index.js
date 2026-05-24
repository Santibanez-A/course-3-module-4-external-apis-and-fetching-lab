// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input");
  const button = document.querySelector("#fetch-alerts");
  const alertsDisplay = document.querySelector("#alerts-display");
  const errorMessage = document.querySelector("#error-message");

  button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    fetchWeatherAlerts(state);

    input.value = "";
  });

  function fetchWeatherAlerts(state) {
    if (state === "") {
      displayError("Please enter a state abbreviation");
      return;
    }

    fetch(`${weatherApi}${state}`)
      .then((response) => response.json())
      .then((data) => {
        displayAlerts(data);
      })
      .catch((errorObject) => {
        displayError(errorObject.message);
      });
  }

  function displayAlerts(data) {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    alertsDisplay.innerHTML = "";

    const summary = document.createElement("h2");

    summary.textContent =
      `${data.title}: ${data.features.length}`;

    alertsDisplay.appendChild(summary);

    const ul = document.createElement("ul");

    data.features.forEach((alert) => {
      const li = document.createElement("li");

      li.textContent = alert.properties.headline;

      ul.appendChild(li);
    });

    alertsDisplay.appendChild(ul);
  }

  function displayError(message) {
    alertsDisplay.innerHTML = "";

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");
  }
});
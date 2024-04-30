function clearAll() {
    const city = document.getElementById("city");
    city.value = "";
    const showWeather = document.getElementById("weather-show");
    showWeather.classList.add("hidden");
    const cityDropdown = document.getElementById("city-dropdown")
    cityDropdown.value="";
}

function closePopUp(){
    const showWeather = document.getElementById("weather-show");
    showWeather.classList.add("hidden");
}

function getWeather() {
  const showWeather = document.getElementById("weather-show");
  showWeather.classList.remove("hidden");
  const apiKey = "c4913cb6c26704953c47eb1566bc6df6";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter a city brooo!");
    closePopUp();
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error kocak:", error);
      alert("yg bener lah masukin kotanya kocak");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error kocak:", error);
    });
}

function displayCityDropDown() {
  const apiKey = "c4913cb6c26704953c47eb1566bc6df6";

  const cityNames = [
    "Aceh",
    "Bali",
    "Banten",
    "Bengkulu",
    "Yogyakarta",
    "Jakarta",
    "Gorontalo",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
  ];

  const cityUrls = cityNames.map(
    () =>
      `https://api.openweathermap.org/data/2.5/find?type=like&q=${city}&appid=${apiKey}`
  );

  cityUrls.map((cityUrl) =>
    fetch(cityUrl)
      .then((response) => response.json())
      .then(() => {
        const cityDropDown = document.getElementById("city-dropdown");
        cityNames.map((name) => {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          cityDropDown.appendChild(option);
        });

        cityDropDown.addEventListener("change", () => {
          document.getElementById("city").value = cityDropDown.value;
        });
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      })
  );
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecastDiv = document.getElementById("hourly-forecast");

    // Clear previous content
    weatherInfoDiv.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";
    tempDivInfo.innerHTML = "";

    if (data.cod === "404") {
        weatherInfoDiv.innerHTML = `<p>kotanya jangan asal asalannn lah</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach((item) => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}


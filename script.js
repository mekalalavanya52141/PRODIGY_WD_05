const weather = {
    apiKey: "YourAPIKey",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging: log the data to ensure we get a response
                this.displayWeather(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar input").value);
    }
};

document.querySelector(".search-bar button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Initial fetch for Vadodara
weather.fetchWeather("Vadodara");


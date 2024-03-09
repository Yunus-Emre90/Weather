const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    const cityName = cityInput.value;
    getData(cityName);
});

function getData(name) {
    const API_KEY = "dd3dca4e5a5c1e803e56f414349dad2c";
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`;

    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            const { name, sys: { country }, main: { temp, feels_like, humidity }, weather: [{ description }], wind: { speed } } = data;
            const city = document.querySelector(".city");
            const temperature = document.querySelector(".temp");
            const hum = document.querySelector(".humidity");
            const wind = document.querySelector(".wind");
            const weatherDesc = document.querySelector(".weather");
            const feeling = document.querySelector(".feeling");

            city.textContent = `${name}, ${country}`;
            temperature.innerText = `${(temp - 273.15).toFixed(1)}°C`; // Convert Kelvin to Celsius with one decimal place
            hum.textContent = `Nem: ${humidity}%`;
            wind.innerHTML = `Rüzgar: ${speed}km/s`;
            weatherDesc.innerHTML = `<i>${description.toUpperCase()}</i>`;
            feeling.textContent = `Hissedilen : ${feels_like}°C`;
        })
        .catch(err => console.log(err));

    cityInput.value = "";
    cityInput.focus();
}

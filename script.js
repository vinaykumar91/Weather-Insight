const Apikey = "cb909c83ba390064484c7b595fbd416f";
const Api_url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const goBack = document.querySelector(".go-back");
const desc = document.querySelector(".description");
const liveLocationButton = document.querySelector(".live-location button");

async function checkWeather(city) {
  const response = await fetch(Api_url + city + `&appid=${Apikey}`);
  try {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".description").innerHTML = data.weather[0].main;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity-value").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".pressure-value").innerHTML =
      data.main.pressure + " mb";
    function datavisib(dataV) {
      if (dataV < 1000) {
        return dataV + " mtrs";
      } else {
        return dataV / 1000 + " kms";
      }
    }
    document.querySelector(".visibility-value").innerHTML = datavisib(
      data.visibility
    );

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".search").style.display = "none";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
        //console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude+","+ longitude);
        checkWeather2(latitude,longitude);
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Geolocation request denied. please reset location permission to grant access again."
        );
      }
    }
  );
};

async function checkWeather2(lat,lon){
    try{
    const response3 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}&units=metric`
      );
      var data2 = await response3.json();
      console.log(data2);
      document.querySelector(".city").innerHTML = data2.name;
      document.querySelector(".description").innerHTML =
        data2.weather[0].main;
      document.querySelector(".temp").innerHTML =
        Math.round(data2.main.temp) + "°C";
      document.querySelector(".humidity-value").innerHTML =
        data2.main.humidity + "%";
      document.querySelector(".wind-value").innerHTML =
        data2.wind.speed + " km/h";
      document.querySelector(".pressure-value").innerHTML =
        data2.main.pressure + " mb";
      function datavisib(dataV) {
        if (dataV < 1000) {
          return dataV + " mtrs";
        } else {
          return dataV / 1000 + " kms";
        }
      }
      document.querySelector(".visibility-value").innerHTML = datavisib(
        data2.visibility
      );

      if (data2.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data2.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data2.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data2.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data2.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data2.weather[0].main == "Haze") {
        weatherIcon.src = "images/drizzle.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".search").style.display = "none";
      document.querySelector(".error").style.display = "none";
    } catch (error) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});

goBack.addEventListener("click", () => {
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".search").style.display = "block";
});

liveLocationButton.addEventListener("click",getUserCoordinates);


"use strict";

// const buttons = document.querySelectorAll("[data-carousel-button]");
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const offset = button.dataset.carouselButton === "next" ? 1 : -1;
//     const slides = document.querySelector("[data-slides]");

//     const activeSlide = slides.querySelector("[data-active]");
//     let newIndex = [...slides.children].indexOf(activeSlide) + offset;
//     if (newIndex < 0) newIndex = slides.children.length - 1;
//     if (newIndex >= slides.children.length) newIndex = 0;

//     slides.children[newIndex].dataset.active = true;
//     delete activeSlide.dataset.active;
//   });
// });

const openWeNewKey = "ae4532a8ae06992f228ffee9d7cb2e0a";
const openWeOldKey = "f886d346a3973ea6203a59bb91d99b11";
const inputLocation = document.querySelector(".input-location");
const seachBtn = document.querySelector(".seach-btn");
let locationSearch = "";

seachBtn.addEventListener("click", locationByNmae);
inputLocation.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    locationByNmae();
  }
});

async function locationByNmae() {
  locationSearch = inputLocation.value;

  if (locationSearch) {
    const resp = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locationSearch}&limit=5&appid=${openWeOldKey}`
    );
    const data = await resp.json();

    if (data && data.length > 0) {
      const dataGotten = data[0];
      document.querySelector(".local-name").textContent = dataGotten.name;
      document.querySelector(".state").textContent = dataGotten.state;
      document.querySelector(".country").textContent = dataGotten.country;
      document.querySelector(".latitude").textContent = dataGotten.lon;
      document.querySelector(".longitude").textContent = dataGotten.lat;

      // mobile
      document.querySelector(".local-name-mob").textContent = dataGotten.name;
      document.querySelector(".state-mob").textContent = dataGotten.state;
      document.querySelector(".country-mob").textContent = dataGotten.country;
      document.querySelector(".longitude-mob").textContent = dataGotten.lat;
      document.querySelector(".latitude-mob").textContent = dataGotten.lon;

      const latitudeValue = dataGotten.lat;
      const longitudeValue = dataGotten.lon;

      const weatherResp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${openWeOldKey}`
      );
      const weatherData = await weatherResp.json();
      const mainData = weatherData.main;
      const windData = weatherData.wind;
      const weather = weatherData.weather;
      const weatherObj = weather[0];

      document.querySelector(".temprature").textContent = mainData.temp;
      document.querySelector(".time").textContent = weatherData.timezone;
      document.querySelector(".humidity").textContent = mainData.humidity;
      document.querySelector(".visibility").textContent =
        weatherData.visibility;
      document.querySelector(".air-pressure").textContent = mainData.pressure;
      document.querySelector(".wind").textContent = windData.speed;
      document.querySelector(".discription").textContent =
        weatherObj.description;
    }
  }
}
// Array(1)
// 0
// :
// {id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n'}
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)

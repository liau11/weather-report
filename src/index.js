let currentLandscape = document.getElementById('seasonal-landscape');
const skyLandscape = document.getElementById('sky-landscape');
const dropDownOutput = document.getElementById("skies");

// Default state
const state = {
    degrees: 67,
    city: 'Seattle'
}

const apiCallLocation = () => {
    const endpointLocation = "http://127.0.0.1:5000/location"
    const endpointWeather = "http://127.0.0.1:5000/weather"
    let latitude, longitude;

    axios.get(endpointLocation, {
        params: {
            q: state.city,
            format: 'json'
        }
    })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            axios.get(endpointWeather, {
                params: {
                    lat: latitude,
                    lon: longitude
                }
            })
                .then((response) => {
                    const degreesKelvin = response.data.main.temp
                    const degreesFahrenheit = Math.floor(((degreesKelvin - 273.15) * (9 / 5) + 32));
                    state.degrees = degreesFahrenheit
                    document.querySelector('#degrees').textContent = state.degrees;
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        });
}

const changeColorTemp = () => {
    const num = state.degrees

    if (num <= 49) {
    } else if (num > 49 && num <= 59) {
        document.getElementById('degrees').style.color = 'green';
    } else if (num > 59 && num <= 69) {
        document.getElementById('degrees').style.color = 'gold';
    } else if (num > 69 && num <= 79) {
        document.getElementById('degrees').style.color = 'orange';
    } else {
        document.getElementById('degrees').style.color = 'red'
    }
}

const landscape = {
    summer: "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂",
    spring: "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷",
    autumn: "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃",
    winter: "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
}

function displayLandscape(degrees) {
    if (degrees <= 59) {
        currentLandscape.textContent = landscape.winter;
    } else if (degrees <= 69) {
        currentLandscape.textContent = landscape.autumn;
    } else if (degrees <= 79) {
        currentLandscape.textContent = landscape.spring;
    } else {
        currentLandscape.textContent = landscape.summer;
    }
}

const sky = {
    sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
    cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
    rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
    snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
}

const displaySky = () => {
    
    const selectedVal = dropDownOutput.value
    
    if (selectedVal in sky) {
        skyLandscape.textContent = sky[selectedVal]
    }

    if (selectedVal === 'snowy') {
        document.getElementById("whole-landscape").style.backgroundColor = "#366492";
    } else if (selectedVal === 'cloudy') {
        document.getElementById("whole-landscape").style.backgroundColor = "#A1ABB5";
    } else if (selectedVal === 'rainy') {
        document.getElementById("whole-landscape").style.backgroundColor = "#60ABF6";
    } else {
        document.getElementById("whole-landscape").style.backgroundColor = "#adeded";
    }
}

const increaseTemp = (event) => {
    state.degrees += 1;
    const degrees = document.querySelector('#degrees');
    degrees.textContent = state.degrees;
    displayLandscape(state.degrees);
};

const decreaseTemp = (event) => {
    state.degrees -= 1;
    const degrees = document.querySelector('#degrees');
    degrees.textContent = state.degrees;
    displayLandscape(state.degrees);
};



const displayNewCity = () => {
    const newCity = document.getElementById('cityName').value;
    const defaultCity = document.getElementById('defaultCity')
    state.city = newCity;
    defaultCity.innerHTML = state.city;
}

const resetCity = () => {
    const newCity = document.getElementById('cityName');
    newCity.value = 'Seattle'
    displayNewCity();
}

// Function for all Event Handlers
const registerEventHandlers = (event) => {
    // Display city text from input box

    const realTimeButton = document.querySelector('#realTimeTemp');
    realTimeButton.addEventListener('click', apiCallLocation);

    // Event handler for dropDown button
    dropDownOutput.addEventListener('change', displaySky);

    const upButton = document.querySelector('#up');
    upButton.addEventListener('click', increaseTemp);
    upButton.addEventListener('click', changeColorTemp);

    const downButton = document.querySelector('#down');
    downButton.addEventListener('click', decreaseTemp);
    downButton.addEventListener('click', changeColorTemp);

    const newCity = document.getElementById('cityName');
    newCity.addEventListener('input', displayNewCity);

    const reset = document.getElementById('resetCity')
    reset.addEventListener('click', resetCity);
}

// Triggers Event Handlers:
document.addEventListener('DOMContentLoaded', registerEventHandlers)




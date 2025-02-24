const URL = "https://api.weatherapi.com/v1/current.json?";
const apiKey = "d23fc15626134e9da9064602252202";
let input = document.querySelector(".search input")
let btn = document.querySelector(".search button")


btn.addEventListener("click", () => { //Event Listener with a Callback Function
    let city = input.value.trim();
    if (city === "") {
        alert("please enter a city name");
        return;
    }
    checkWeather(city); // city is passed as an argument for the checkweath func.
});


async function checkWeather(q) { // Q is basic function here
   
    try{
   
    const response = await fetch(URL + "q=" + q + `&key=${apiKey}`);
        if(!response.ok){
            throw new Error(`HTTP Error: Status : ${response.status}`)
        }
    
    var data = await response.json();
    console.log(data);
    console.log(response.status);

    if(!data.location){
        throw new Error("No Matching Location Found");
    }

    document.querySelector(".cityname").innerHTML = data.location.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    
    let weathertype = document.querySelector(".weathertype");
    let localtime = document.querySelector(".localtime");
    let weatherIcon = document.querySelector(".weatherimg");
    weatherIcon.src = "https://" + data.current.condition.icon;
    weatherIcon.alt =  data.current.condition.text;
    weathertype.innerHTML = data.current.condition.text;
    localtime.innerHTML = data.location.localtime;


}

    catch (error){
        console.error("Error Fetching Weather Data:", error.message);
        alert(error.message);
    }

}


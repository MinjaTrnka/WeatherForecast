function makeHttpRequest(method, url, callback) {
    let http = new XMLHttpRequest();
    http.open(method, url)
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.response)

        }
    }
    http.send();
}

makeHttpRequest('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=43.8563&lon=18.4131&exclude=minutely&appid=3f151804407993780652d28984fa2665', function (response) {

    let obj = JSON.parse(response);
    console.log(obj);
    // current weather
    town.innerHTML = obj.timezone;
    currentDate.innerHTML = new Date().toLocaleString();
    currentDesc.innerHTML = obj.current.weather[0].description;
    currentTemp.innerHTML = celsius(obj.current.temp) + '&#8451'
    showIcons(obj.current.weather[0].description);
    realFeel.innerHTML = 'RealFeel:  ' + celsius(obj.current.feels_like);
    windSpeed.innerHTML = 'WindSpeed: ' + obj.current.wind_speed;
    visibility.innerHTML = 'Visibility: ' + obj.current.visibility;
    // daily weather
    for (let i = 0; i < obj.daily.length; i++) {
        let element = obj.daily[i];
        let dtDaily = new Date(element.dt * 1000).toUTCString();
        let showDailyDate = document.createElement('p');
        showDailyDate.innerHTML = dtDaily;
        showDailyDate.classList.add('showDate')
        let showDesc = document.createElement('p');
        showDesc.innerHTML = element.weather[0].description;
        showDesc.classList.add('showDesc')
        let showDailyTemp = document.createElement('p');
        showDailyTemp.innerHTML = celsius(element.temp.day) + '&#8451';
        showDailyTemp.classList.add('showTemp')

        let icon = document.createElement('p');
        icon.innerHTML = showIcons(element.weather[0].description);
        icon.style.fontSize = '15px'
        dailyForecast.appendChild(showDailyDate);
        showDailyDate.appendChild(showDesc);
        showDesc.appendChild(showDailyTemp);
        showDailyTemp.appendChild(icon);
    }

    function celsius(num) {
        let temp = (num - 273.15).toFixed();
        return temp;
    }

    function showIcons(desc) {
        if (desc === 'overcast clouds' || desc === 'few clouds' || desc === 'scattered clouds' || desc === 'broken clouds') {
            icon.innerHTML = '<i class="fas fa-cloud fa-3x"></i>';
        }
        if (desc === 'rain and snow' || desc === 'light rain' || desc === 'moderate rain') {
            icon.innerHTML = '<i class="fas fa-cloud-rain fa-3x"></i>';
        }
        if (desc === 'clear sky') {
            icon.innerHTML = '<i class="fas fa-sun fa-3x"></i>'
        }
        if (desc === 'snow' || desc === 'heavy snow') {
            icon.innerHTML = '<i class="fas fa-snowflake fa-3x"></i>'
        }
        return icon.innerHTML;
    }
})







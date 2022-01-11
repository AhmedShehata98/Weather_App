// iniializing Variables
// 
let cityNameInput ='egypt' ,
    lat ,
    lon ;

const toggleBTN               = document.querySelector('.toggle');
const navControlpanel         = document.querySelector('.ControlPannel');
const mobSearch               = document.querySelector('#mobSearch');
const mobSendData             = document.querySelector('#mobSendData');
const toggleNotificationPanel = document.querySelector('.toggleNotificationPanel');
const NotifCount              = document.querySelector('.toggleNotificationPanel .NotifCount');


const searchInput       = document.querySelector('.searchContainer #inputCity');
const suggestList       = document.querySelector('.leftSection .appSearch .searchContainer .suggestList');
const weekDays          = [ 'Saturday','Sunday','Monday','Tuesday','Wednesday' ,'Thursday' ,'Friday' ];

const weekDaysContainer = document.querySelector('ul.weekdaysWithweather');
const cityChoosedName   = document.querySelector('.CityChoosedName .countryDisplayedTxt')
const cityChoosedImg    = document.querySelector('.CityChoosedName .countryDisplayedIMG img')

const onloadOverlay     = document.querySelector('.getUsername×Onload')
const onloadOverlayInput= document.querySelector('.getUsername×Onload #username');
const onloadOverlayBTN  = document.querySelector('.getUsername×Onload .sendUsername');
const mobWelcomeMSG     = document.querySelector('.welcomeMSG');
const mobUserName       = document.querySelector('.username');
const mobDate           = document.querySelector('.dateAndTimeMob .date');
const mobTime           = document.querySelector('.dateAndTimeMob .time');
const temp              = document.querySelector('.WeatherInfo .tempture .temp');
const forecastLogo      = document.querySelector('.WeatherInfo .TempatureLogo');
const feelLike          = document.querySelector('.WeatherInfo .feelTXTMob');
const humidityMob       = document.querySelector('.WeatherInfo .HumidityTXT');
const CountryMob        = document.querySelector('.CountryMob')
const CityMob           = document.querySelector('.cityMob');
const forecastDescription = document.querySelector('.ForecastDescriptonTxt');
const notification_popup  = document.querySelector('.notifications-popup ')
const countriesList       = document.querySelectorAll('.countrysCont .country')


// creating Functuions
// 
// 

// GET Location in latitude and longitude
// Start
function GetUserlocation (){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successPosition,posError )
    }else{
        createAlertMSG('Your browser isnt support this method, try to search in search box',3500)
        clearLastAlertMSG(3000)
    }
}
        function successPosition(position){
            lat = position.coords.latitude
            lon = position.coords.longitude
        }

        function posError(error){
            switch(error.code){
                case error.PERMISSION_DENIED:
                    createAlertMSG('Hey! You declined your location request How am I supposed to know your location',5000);
                case error.POSITION_UNAVAILABLE:
                    createAlertMSG("Unable to locate your location, please check your GPS   settings ",5000)
                    getLocationFrom();
            }
        }
// 
// End 



/* get location for the weather api from GeoLocation If can't 
get the 'Lat & lon' information so try to Get information from 
user Search input ..
*/
GetUserlocation();

setTimeout(()=>{
    getLocationFromInput();
    getLocationByClickOn(countriesList);
    function getLocationByClickOn(countriesList){
        countriesList.forEach(country=>{
            country.addEventListener('click',(e)=>{
                console.log(e.target.closest('.country').dataset.id);
            cityNameInput = e.target.closest('.country').dataset.id;
            let API_URL= `https://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701%20&days=7&aqi=no&alerts=no&q=${cityNameInput}`
            FETCH_WEATHER_DATA_FROM(API_URL)
        })
        
        })
    }
    function getLocationFromInput(){
        mobSendData.addEventListener('click',()=>{
            cityNameInput = mobSearch.value;
            mobSearch.value = ''
            let API_URL= `https://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701%20&days=7&aqi=no&alerts=no&q=${cityNameInput}`
            FETCH_WEATHER_DATA_FROM(API_URL)
        })
    }

        // this condition is for control btw calling methods
            if (lat !== undefined && lon !== undefined) {

                let API_URL= `https://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701%20&days=7&aqi=no&alerts=no&dt&q=${lat},${lon}`
                        FETCH_WEATHER_DATA_FROM(API_URL)

            }else{
                mobSearch.focus();
                let API_URL= `https://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701%20&days=7&aqi=no&alerts=no&q=${cityNameInput}`
                        FETCH_WEATHER_DATA_FROM(API_URL)
            }

    async function FETCH_WEATHER_DATA_FROM (API_URL){


        let respone = await fetch(API_URL);
        let data =  await respone.json();
    

        weekdaysForecatHTML(weekDays,data);
        ForecastInnerMobile(data);
        setMobForecastBG(data)
        getSelectedRegionBasedOn(data)
    }
},3000)

var weekdaysForecatHTML=(weekdaysArr,apiData)=>{
        weekDaysContainer.innerHTML = '';
        cityChoosedName.textContent = apiData.location.name;
        ImgSrc(apiData);

    for(let i=0 ; i < apiData.forecast.forecastday.length ;i++){
        let li = document.createElement('li'),
        dayName = document.createElement('a'),
        spanHumidityCountainer = document.createElement('span'),
        spanweatherConditionCountainer   = document.createElement('span'),
        spanWindsCountainer = document.createElement('span'),
        spanFeelLikeCountainer = document.createElement('span'),
        spanTemptureCountainer = document.createElement('span'),

        spanTempMinChild  = document.createElement('span'),
        spanTempMaxChild  = document.createElement('span'),
        humidityLogo = document.createElement('ion-icon'),
        windsLogo = document.createElement('img'),
        feelLikeLogo = document.createElement('ion-icon'),
        tempMinLogo  = document.createElement('ion-icon'),
        tempMaxLogo  = document.createElement('ion-icon'),
        weatherConditionImg  = document.createElement('img'),
        windsImg  = document.createElement('img'),
        humidityTXT  = document.createElement('p'),
        weatherConditionTXT  = document.createElement('p'),
        windsTXT  = document.createElement('p'),
        feelLikeTXT  = document.createElement('p'),
        minTempTXT  = document.createElement('p'),
        maxTempTXT  = document.createElement('p');

        // Append Items

        li.appendChild(dayName);
        li.appendChild(spanHumidityCountainer);
        li.appendChild(spanweatherConditionCountainer);
        li.appendChild(spanWindsCountainer);
        li.appendChild(spanFeelLikeCountainer);
        li.appendChild(spanTemptureCountainer);
        dayName.appendChild( document.createTextNode(weekdaysArr[i]));
        spanHumidityCountainer.appendChild(humidityLogo );
        spanweatherConditionCountainer.appendChild(weatherConditionImg );
        spanWindsCountainer.appendChild(windsLogo );
        spanFeelLikeCountainer.appendChild(feelLikeLogo );
        spanTemptureCountainer.appendChild( spanTempMinChild);
        spanTemptureCountainer.appendChild( spanTempMaxChild);
        spanTempMinChild.appendChild(tempMinLogo);
        spanTempMaxChild.appendChild(tempMaxLogo);
        spanTempMinChild.appendChild(minTempTXT);
        spanTempMaxChild.appendChild(maxTempTXT);
        spanHumidityCountainer.appendChild( humidityTXT);
        spanweatherConditionCountainer.appendChild(weatherConditionTXT );
        spanWindsCountainer.appendChild( windsTXT);
        spanFeelLikeCountainer.appendChild(feelLikeTXT );
        humidityTXT.appendChild(document.createTextNode(apiData.forecast.forecastday[i].day.avghumidity +' %'));
        weatherConditionTXT.appendChild( document.createTextNode(apiData.forecast.forecastday[i].day.condition.text));
        windsTXT.appendChild( document.createTextNode( apiData.forecast.forecastday[i].day.maxwind_kph +' '+'KPH' ));
        feelLikeTXT.appendChild(document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.avgtemp_c)));
        minTempTXT.appendChild( document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.mintemp_c)));
        maxTempTXT.appendChild( document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.maxtemp_c)));
        feelLikeTXT.innerHTML += '  '+'&#8451'
        minTempTXT.innerHTML += '  '+'&#8451'
        maxTempTXT.innerHTML += '  '+'&#8451'

        // set attribute and classes
        li.className = 'flexbox-center-row'
        dayName.className ='day';
        spanHumidityCountainer.className ='humidityCountainer flexbox-center-row';
        humidityLogo.className='humidityIco';
        humidityLogo.setAttribute('name','water');
        humidityTXT.className='humidityTxt';
        spanweatherConditionCountainer.className ='weatherCondition flexbox-center-row';
        weatherConditionImg.src = apiData.forecast.forecastday[i].day.condition.icon;
        spanWindsCountainer.className ='winds flexbox-center-row';
        windsLogo.className='windsIco';
        windsLogo.setAttribute('src','assists/img/weather-conditions/wind.png');
        windsTXT.className='windsTXT';
        spanFeelLikeCountainer.className ='feelLike flexbox-center-row';
        feelLikeLogo.className='feelLikeIco';
        feelLikeLogo.setAttribute('name','man');
        feelLikeTXT.className='feelLikeTxt';
        spanTemptureCountainer.className ='tempture flexbox-center-row';
        spanTempMinChild.className= 'tempMin flexbox-center-row';
        spanTempMaxChild.className= 'tempHigh flexbox-center-row';
        tempMinLogo.className='tempMinIco';
        tempMinLogo.setAttribute('name','thermometer');
        minTempTXT.className='tempMinTxt';
        tempMaxLogo.className='tempMaxIco';
        tempMaxLogo.setAttribute('name','thermometer');
        maxTempTXT.className='tempMaxText';
        
        weekDaysContainer.appendChild(li);
    }

}

// Set The reion img in the page the known who the region is now
function ImgSrc(api){
    let regoin = api.location.region;
    let name = api.location.name;
    switch (regoin) {
        case "Al Iskandariyah":
            cityChoosedImg.src = 'assists/img/egypt/citys/alexsandria.jpg'
            break;
        case "Al Qahirah":
            cityChoosedImg.src = 'assists/img/egypt/citys/cairo.jpg'
            break;
        case "Al Isma'iliyah":
            cityChoosedImg.src = 'assists/img/egypt/citys/Ismailia.jpg'
            break;
        case 'Aswan':
            cityChoosedImg.src  = 'assists/img/egypt/citys/aswan.jpg'
            break;

        default:
            cityChoosedImg.src  = 'assists/img/egypt/citys/default.png'
            break;
    }
    switch(name){
        case 'Giza':
            cityChoosedImg.src  = 'assists/img/egypt/citys/giza.jpg'
            break;
        case 'Luxor':
            cityChoosedImg.src  = 'assists/img/egypt/citys/luxor.jpg'
            break;
    }
}

// Hndling splash screen beavior
var onloadOverLayMSG=()=>{
    onloadOverlayBTN.addEventListener('click',()=>{
        if (onloadOverlayInput.value == null || onloadOverlayInput.value == '') {
            // set Not entered msg
            mobUserName.textContent = 'Not entered'


            // add active class to popup panel and set timeout to remove that after 1.5s
            createAlertMSG(" Be careful, you didn't enter your name ",8000)
            clearLastAlertMSG(7500)

        }else{    
            // mobUserName.textContent = onloadOverlayInput.value;
            
            //  check if value is existing in localstorage if not so set value
            if (window.localStorage.getItem('userName') === null ) {
                SaveToStorage("userName",onloadOverlayInput.value.trim());
                mobUserName.textContent = getFromStorage('userName')
                onloadOverlay.remove();
            }
        }
    })
}

// get username and remove overlay
window.onload= function(){
    if (window.localStorage.getItem('userName') !== null) {
        onloadOverlay.remove();
        mobUserName.textContent = getFromStorage('userName');
    }
    
}


// Inner the Weather Forcast in mobile version section
var ForecastInnerMobile = (api)=>{
    mobDate.textContent= api.current.last_updated.split(' ')[0]
    mobTime.textContent= api.current.last_updated.split(' ')[1]

    // forecast inner
    temp.textContent = Math.trunc(api.current.temp_c);
    forecastLogo.src = api.current.condition.icon;
    feelLike.textContent = Math.trunc(api.current.feelslike_c);
    humidityMob.textContent = api.current.humidity + ' %';
    CountryMob.textContent= api.location.country
    CityMob.textContent = api.location.region || api.location.name;
    forecastDescription.textContent = api.current.condition.text;
}


// If For Setup Background Image based on time now 
var setMobForecastBG=(api)=>{
    let getAPIHour = Number( api.location.localtime.split(' ')[1].split(":")[0]);

    if (getAPIHour > 12) {
        mobWelcomeMSG.textContent = 'Good Evening'
        document.querySelector('.rightSection').style.backgroundImage= "  url('assists/img/summer/summNight.png') "

    }else{
        mobWelcomeMSG.textContent = 'Good Morinig'
        document.querySelector('.rightSection').style.backgroundImage= "  url('assists/img/summer/summMorning.png') "
    }

}


// CreateNew Alert MSG
function createAlertMSG(textMessage,msgTimeout){

    // Create the 'li' element and append " h5 " and " logo "
    let li = document.createElement('li');
    li.classList.add('msgBox' ,'flexbox-center-row')
    let textMSG = document.createElement('h5')
    li.prepend(textMSG);
    textMSG.appendChild(document.createTextNode(textMessage));
    textMSG.className= 'notif-msg' ;
    let alertLogo = document.createElement('ion-icon');
    alertLogo.setAttribute('name','alert') ;
    alertLogo.className='notif-logo'
    li.appendChild(alertLogo);

    // append to Parent Element
    notification_popup.appendChild(li);

    notification_popup.classList.add('active');
            
    setTimeout(() => {
        notification_popup.classList.remove('active');
    }, msgTimeout);
}

function clearLastAlertMSG(afterTime) {
    setTimeout(() => {
        notification_popup.lastElementChild.remove()
    }, afterTime);

}

function getSelectedRegionBasedOn(api){
    countriesList.forEach(country =>{
        country.classList.contains('active') ? country.classList.remove('active') : ""
        if (api.location.region === country.getAttribute('data-id')) {
            country.classList.add('active')
        }
        if (api.location.region == '') {
            if (api.location.name === country.getAttribute('data-id') ) {
            country.classList.add('active')
            }
        }

    })
}

function SaveToStorage(keyName,Value){
    if (keyName !== null || keyName!== undefined && Value !== null ||Value !== undefined) {
        window.localStorage.setItem(keyName,Value);
    }else{
        console.log(Error ,"{ There's Something }");
    }
}

function getFromStorage(key){
    if (window.localStorage.length > 0) {
     return  window.localStorage.getItem(key)
    }else{
        console.log(Error ,"{ There's Something }");
    }
}
// Calling Functions
// 

onloadOverLayMSG();

// Adding Events
// 


toggleBTN.addEventListener('click',()=>{
    navControlpanel.classList.toggle('active')
})

toggleNotificationPanel.addEventListener('click',()=>{
    notification_popup.classList.toggle('active')
})
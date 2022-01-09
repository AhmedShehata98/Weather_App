// iniializing Variables
// 
let currentLocation ;

const toggleBTN               = document.querySelector('.toggle');
const navControlpanel         = document.querySelector('.ControlPannel');
const mobSearch               = document.querySelector('#mobSearch');
const mobSendData             = document.querySelector('#mobSendData');
const toggleNotificationPanel = document.querySelector('.toggleNotificationPanel');
const NotifCount = document.querySelector('.toggleNotificationPanel');


const searchInput = document.querySelector('.searchContainer #inputCity');
const suggestList = document.querySelector('.leftSection .appSearch .searchContainer .suggestList');
const weekDays = [ 'Saturday','Sunday','Monday','Tuesday','Wednesday' ,'Thursday' ,'Friday' ];

const weekDaysContainer = document.querySelector('ul.weekdaysWithweather');
const cityChoosedName   = document.querySelector('.CityChoosedName .countryDisplayedTxt')
const cityChoosedImg   = document.querySelector('.CityChoosedName .countryDisplayedIMG img')

const onloadOverlay = document.querySelector('.getUsername×Onload')
const onloadOverlayInput = document.querySelector('.getUsername×Onload #username');
const onloadOverlayBTN = document.querySelector('.getUsername×Onload .sendUsername');
const mobWelcomeMSG = document.querySelector('.welcomeMSG');
const mobUserName =document.querySelector('.username');
const mobDate =document.querySelector('.dateAndTimeMob .date');
const mobTime =document.querySelector('.dateAndTimeMob .time');
const temp  = document.querySelector('.WeatherInfo .tempture .temp');
const forecastLogo  = document.querySelector('.WeatherInfo .TempatureLogo');
const feelLike  = document.querySelector('.WeatherInfo .feelTXTMob');
const humidityMob  = document.querySelector('.WeatherInfo .HumidityTXT');
const CountryMob  = document.querySelector('.CountryMob')
const CityMob  = document.querySelector('.cityMob');
const forecastDescription  = document.querySelector('.ForecastDescriptonTxt');
const notification_popup = document.querySelector('.notifications-popup ')
const countriesList      = document.querySelectorAll('.countrysCont .country')


// creating Functuions
// 
// 


function GetUserlocation (){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successPosition,posError )
    }else{
        createAlertMSG('Your browser isnt support this method, try to search in search box',3500)
        clearLastAlertMSG(3000)
        
        // Get City name from search input 
        getLocationFrom();
    }
}

function successPosition(position){
    let usrLatitude = position.coords.latitude
    let usrLongtude = position.coords.longitude
        fetchApiData(usrLatitude,usrLongtude);
}

function posError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            createAlertMSG('Hey! You declined your location request How am I supposed to know your location',5000);
            clearLastAlertMSG(5000);
            getLocationFrom();
        case error.POSITION_UNAVAILABLE:
            createAlertMSG("Unable to locate your location, please check your GPS   settings",5000)
            clearLastAlertMSG(5000);
            getLocationFrom();
    }
}

function getLocationFrom(){
    mobSendData.addEventListener('click',()=>{
        let cityName = mobSearch.value;
        fetchApiData();
    })
}

async function fetchApiData (lat,longt,cityName){
    if (lat !== null || lat !== undefined && longt !== null || longt !== undefined )
    {
        let apiURL = 'http://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701&days=7&aqi=no&alerts=no&'

        let respone = await fetch(apiURL + "q=" + lat +','+ longt ),
        data =  await respone.json();
        currentLocation =data.location.region
        weekdaysForecatHTML(weekDays,data);
        ForecastInnerMobile(data);
        setMobForecastBG(data)
        getSelectedRegionBasedOn(data)
    }else{
        let apiURL = 'http://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701&days=7&aqi=no&alerts=no&'

        let respone = await fetch(apiURL + "q=" + cityName ),
        data =  await respone.json();
        currentLocation =data.location.region
        weekdaysForecatHTML(weekDays,data);
        ForecastInnerMobile(data);
        setMobForecastBG(data)
    }

}

// async function fetchDataCityName(cityname1) {
//     let apiURL = 
// }

var weekdaysForecatHTML=(weekdaysArr,apiData)=>{
        weekDaysContainer.innerHTML = '';
        cityChoosedName.textContent = apiData.location.name;
        ImgSrc(apiData);
        

    for(let i=0 ; i < apiData.forecast.forecastday.length ;i++){
        let li = document.createElement('li'),
        dayName = document.createElement('a'),
        spanHumidityCountainer = document.createElement('span'),
        spanweatherConditionCountainer   = document.createElement('span'),
        spanPressureCountainer = document.createElement('span'),
        spanFeelLikeCountainer = document.createElement('span'),
        spanTemptureCountainer = document.createElement('span'),

        spanTempMinChild  = document.createElement('span'),
        spanTempMaxChild  = document.createElement('span'),
        humidityLogo = document.createElement('ion-icon'),
        pressureLogo = document.createElement('ion-icon'),
        feelLikeLogo = document.createElement('ion-icon'),
        tempMinLogo  = document.createElement('ion-icon'),
        tempMaxLogo  = document.createElement('ion-icon'),
        weatherConditionImg  = document.createElement('img'),
        humidityTXT  = document.createElement('p'),
        weatherConditionTXT  = document.createElement('p'),
        pressureTXT  = document.createElement('p'),
        feelLikeTXT  = document.createElement('p'),
        minTempTXT  = document.createElement('p'),
        maxTempTXT  = document.createElement('p');

        // Append Items

        li.appendChild(dayName);
        li.appendChild(spanHumidityCountainer);
        li.appendChild(spanweatherConditionCountainer);
        li.appendChild(spanPressureCountainer);
        li.appendChild(spanFeelLikeCountainer);
        li.appendChild(spanTemptureCountainer);
        dayName.appendChild( document.createTextNode(weekdaysArr[i]));
        spanHumidityCountainer.appendChild(humidityLogo );
        spanweatherConditionCountainer.appendChild(weatherConditionImg );
        spanPressureCountainer.appendChild(pressureLogo );
        spanFeelLikeCountainer.appendChild(feelLikeLogo );
        spanTemptureCountainer.appendChild( spanTempMinChild);
        spanTemptureCountainer.appendChild( spanTempMaxChild);
        spanTempMinChild.appendChild(tempMinLogo);
        spanTempMaxChild.appendChild(tempMaxLogo);
        spanTempMinChild.appendChild(minTempTXT);
        spanTempMaxChild.appendChild(maxTempTXT);
        spanHumidityCountainer.appendChild( humidityTXT);
        spanweatherConditionCountainer.appendChild(weatherConditionTXT );
        spanPressureCountainer.appendChild( pressureTXT);
        spanFeelLikeCountainer.appendChild(feelLikeTXT );
        humidityTXT.appendChild(document.createTextNode(apiData.forecast.forecastday[i].day.avghumidity +' %'));
        weatherConditionTXT.appendChild( document.createTextNode(apiData.forecast.forecastday[i].day.condition.text));
        pressureTXT.appendChild( document.createTextNode( '??' ));
        feelLikeTXT.appendChild(document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.avgtemp_c)));
        minTempTXT.appendChild( document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.mintemp_c)));
        maxTempTXT.appendChild( document.createTextNode(Math.trunc(apiData.forecast.forecastday[i].day.maxtemp_c)));
        feelLikeTXT.innerHTML += '  '+'&#8451'
        minTempTXT.innerHTML += '  '+'&#8451'
        maxTempTXT.innerHTML += '  '+'&#8451'

        // set attribute and classes
        dayName.className ='day';
        spanHumidityCountainer.className ='humidityCountainer flexbox-center-row';
        humidityLogo.className='humidityIco';
        humidityLogo.setAttribute('name','water');
        humidityTXT.className='humidityTxt';
        spanweatherConditionCountainer.className ='weatherCondition flexbox-center-row';
        weatherConditionImg.src = apiData.forecast.forecastday[i].day.condition.icon;
        spanPressureCountainer.className ='pressure flexbox-center-row';
        pressureLogo.className='pressureIco';
        pressureLogo.setAttribute('name','speedometer');
        pressureTXT.className='pressureTxt';
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
    let name = api.location.region;
    switch (name) {
        case "Al Iskandariyah":
            cityChoosedImg.src = '../assists/img/egypt/citys/alexsandria.jpg'
            break;
        case "Al Qahirah":
            cityChoosedImg.src = '../assists/img/egypt/citys/cairo.jpg'
            break;
        case "Al Isma'iliyah":
            cityChoosedImg.src = '../assists/img/egypt/citys/Ismailia.jpg'
            break;
        case 'Giza':
            cityChoosedImg.src  = '../assists/img/egypt/citys/giza.jpg'
            break;
        case 'Aswan':
            cityChoosedImg.src  = '../assists/img/egypt/citys/aswan.jpg'
            break;
        case 'Qina':
            cityChoosedImg.src  = '../assists/img/egypt/citys/luxor.jpg'
            break;
        default:
            cityChoosedImg.src  = '../assists/img/egypt/citys/default.png'
            break;
    }
}

// Hndling beavior in splash screen
var onloadOverLayMSG=()=>{
    onloadOverlayBTN.addEventListener('click',()=>{
        if (onloadOverlayInput.value == null || onloadOverlayInput.value == '') {
            // set Not entered msg
            mobUserName.textContent = 'Not entered'


            // add active class to popup panel and set timeout to remove that after 1.5s
            createAlertMSG(" Be careful, you didn't enter your name ",3000)
            clearLastAlertMSG(2000)

        }else{    
            mobUserName.textContent = onloadOverlayInput.value;
        }
        onloadOverlay.remove();
    })
}


// Inner the Weather Forcast in mobile version section
var ForecastInnerMobile = (api)=>{
    mobDate.textContent= api.current.last_updated.split(' ')[0]
    mobTime.textContent= api.current.last_updated.split(' ')[1]

    // forecast inner
    temp.textContent = api.current.temp_c;
    forecastLogo.src = api.current.condition.icon;
    feelLike.textContent = api.current.feelslike_c;
    humidityMob.textContent = api.current.humidity + ' %';
    CountryMob.appendChild(document.createTextNode(api.location.country))
    CityMob.textContent = api.location.region || api.location.name;
    forecastDescription.textContent = api.current.condition.text;
}

var setMobForecastBG=(api)=>{
    let getAPIHour = Number( api.location.localtime.split(' ')[1].split(":")[0]);
    
    if (getAPIHour > 12) {
        mobWelcomeMSG.textContent = 'Good Evening'

    }else{

        mobWelcomeMSG.textContent = 'Good Morinig'
    }

        // If For Setup Background Image based on time now and temp degree

    if (api.current.feelslike_c <= 14 && getAPIHour >= 12) {
        document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/winter/winNight.png') "
    }else if(api.current.feelslike_c <= 14 && getAPIHour < 12){
        document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/winter/winmorning.png') "
    }

    if (api.current.feelslike_c >= 19 && getAPIHour < 12) {
        document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/summer/summMorning.png') "
        
    }else if(api.current.feelslike_c >= 19 && getAPIHour >= 12){
        document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/summer/summNight.png') "

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
        if (api.location.region === country.getAttribute('data-id')) {
            country.classList.add('active')
        }
    })
}
// Calling Functions
// 

GetUserlocation();
onloadOverLayMSG();
getLocationFrom();

// Adding Events
// 



searchInput.addEventListener('keyup',()=>{
    
    if (searchInput.value.length >= 1) {
        suggestList.classList.add('active');
        suggestList.innerHTML = `<li>${searchInput.value}</li>`

        // Get Value and remove list items
            Array.from(suggestList.children).forEach( child =>{
                child.addEventListener('click',(e)=>{
                    GeoLocation = e.target.textContent ;
                    fetchApiData(urlAPI);

                    
                    e.target.parentElement.remove() ;
                })
            })
    }else{
        
        suggestList.classList.remove('active')

    }
})

searchInput.addEventListener('keyup',(e)=>{
    if (e.key === 'Backspace') {
        Array.from(suggestList.children).forEach( child => child.remove() )
    }
})

toggleBTN.addEventListener('click',()=>{
    navControlpanel.classList.toggle('active')
})
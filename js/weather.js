// iniializing Variables
// 
let GeoLocation = [];
// Get GeoLocation Information
GetUserlocation(GeoLocation)
const urlAPI = `http://api.weatherapi.com/v1/forecast.json?key=88fd05005e44488bab5121339220701&q=${GeoLocation.join()}&days=7&aqi=no&alerts=no`

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

const countriesList = document.querySelectorAll('.countrysCont div');



// creating Functuions
// 



async function fetchApiData (url){
    let respone = await fetch(url),
        data =  await respone.json();
        weekdaysForecatHTML(weekDays,data);
        ForecastInnerMobile(data);
        chooseMobForeCastBG(data)
    
    console.log('api is' + url);

}

var weekdaysForecatHTML=(weekdaysArr,apiData)=>{
        weekDaysContainer.innerHTML = '';
        cityChoosedName.textContent = apiData.location.name;
        ImgSrc(apiData);


    for(let i=0 ; i < weekdaysArr.length ;i++){
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
        // humidityTXT.appendChild(document.createTextNode(apiData.main.humidity+' %'));
        // weatherConditionTXT.appendChild( document.createTextNode());
        // pressureTXT.appendChild( document.createTextNode());
        // feelLikeTXT.appendChild(document.createTextNode());
        // minTempTXT.appendChild( document.createTextNode());
        // maxTempTXT.appendChild( document.createTextNode());


        // set attribute and classes
        dayName.className ='day';
        spanHumidityCountainer.className ='humidityCountainer flexbox-center-row';
        humidityLogo.className='humidityIco';
        humidityLogo.setAttribute('name','water');
        humidityTXT.className='humidityTxt';
        spanweatherConditionCountainer.className ='weatherCondition flexbox-center-row';
        weatherConditionImg.src = '../assists/img/weather-conditions/cloudy (1).png';
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

function ImgSrc(api){
    let name = api.location.name;
    switch (name) {
        case 'Alexandria':
            cityChoosedImg.src = '../assists/img/egypt/citys/alexsandria.jpg'
            break;
        case "Cairo":
            cityChoosedImg.src = '../assists/img/egypt/citys/cairo.jpg'
            break;
        case "Ismailia":
            cityChoosedImg.src = '../assists/img/egypt/citys/Ismailia.jpg'
            break;
        case 'Giza':
            cityChoosedImg.src  = '../assists/img/egypt/citys/giza.jpg'
            break;
        case 'aswan':
            cityChoosedImg.src  = '../assists/img/egypt/citys/aswan.jpg'
            break;
        case 'Luxor':
            cityChoosedImg.src  = '../assists/img/egypt/citys/luxor.jpg'
            break;
        default:
            cityChoosedImg.src  = '../assists/img/egypt/citys/default.png'
            break;
    }
}


var onloadOverLayMSG=()=>{
    onloadOverlayBTN.addEventListener('click',()=>{
        if (onloadOverlayInput.value == null || onloadOverlayInput.value == '') {
            
            mobUserName.textContent = 'Not entered'
        }else{    
            mobUserName.textContent = onloadOverlayInput.value;
        }
        onloadOverlay.remove();
    })
}

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
var chooseMobForeCastBG=(api)=>{
    let getAPIHour = Number( api.location.localtime.split(' ')[1].split(":")[0]);
    
    if (getAPIHour > 12) {
        mobWelcomeMSG.textContent = 'Good Evening'
        if (api.current.feelslike_c <= 14) {
            
            document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/winter/winNight.png') "
        }else{

            document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/summer/summNight.png') "
        }
    }else{
        mobWelcomeMSG.textContent = 'Good Morinig'
        if (api.current.feelslike_c <= 14) {
            document.querySelector('.rightSection').style.backgroundImage= "  url('../assists/img/summer/summMorning.png') "
            
        }else{

        }
    }
}

function GetUserlocation (GeoLocationArr){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (posiosion,error)=>{
            GeoLocationArr.splice(0,2)
            GeoLocationArr.push(posiosion.coords.latitude)
            GeoLocationArr.push(posiosion.coords.longitude)
            
        })
    }else{
        console.log('error something');
    }
}

// Calling Functions
// 

fetchApiData(urlAPI);
onloadOverLayMSG();


// Adding Events
// 


// Get The Activated Caountry
countriesList.forEach(country => {
    if (country.dataset.id == GeoLocation) {
        country.classList.add('active')
    }else{
        country.classList.remove('active')
    }
})


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
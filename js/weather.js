// iniializing Variables
// 
let countryName = 'giza';
const openWeatherMapAPI = `http://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=74cce337503c10742eb942d8476e78b6`
const weekDays = [ 'Saturday','Sunday','Monday','Tuesday','Wednesday' ,'Thursday' ,'Friday' ];

const weekDaysContainer = document.querySelector('ul.weekdaysWithweather');
const cityChoosedName   = document.querySelector('.CityChoosedName .countryDisplayedTxt')
const cityChoosedImg   = document.querySelector('.CityChoosedName .countryDisplayedIMG img')

const onloadOverlay = document.querySelector('.getUsername×Onload')
const onloadOverlayInput = document.querySelector('.getUsername×Onload #username');
const onloadOverlayBTN = document.querySelector('.getUsername×Onload .sendUsername');
let userName ;
const mobWelcomeMSG = document.querySelector('.welcomeMSG')
const mobUserName =document.querySelector('.username')
const mobDate =document.querySelector('.dateAndTimeMob .date')
const mobTime =document.querySelector('.dateAndTimeMob .time')


// creating Functuions
// 
var fetchApiData = async (url)=>{
    let respone = await fetch(url),
        data =  await respone.json();
        weekdaysForecatHTML(weekDays,data);
        ForecastInnerMobile(data,userName);
    
}

var weekdaysForecatHTML=(weekdaysArr,apiData)=>{
        weekDaysContainer.innerHTML = '';
        
        cityChoosedName.textContent = apiData.name

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
    let name = api.name;
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
        userName = onloadOverlayInput.value;
        onloadOverlay.remove();
    })
}
var  ForecastInnerMobile = (api,username)=>{
    let timeanddate = new Date(),
        hour = timeanddate.getHours(),
        mins = timeanddate.getMinutes(),
        Day = timeanddate.getDay(),
        Month = timeanddate.getUTCMonth();
    
}

var DateFormat=()=>{

}
// Calling Functions
// 
// weekdaysForecatHTML(weekDays);
fetchApiData(openWeatherMapAPI);
window.onload= onloadOverLayMSG();
// Adding Events
// 

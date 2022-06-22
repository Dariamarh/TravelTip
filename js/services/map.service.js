import { storageService } from './storage-service.js'

export const mapService = {
    initMap,
    addMarker,
    onClickMap,
    setLocation,
    geoSearch,

}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            gMap.addListener("click", (e) => {
                onClickMap (e.latLng)
              })
        })
       
}

function onClickMap(pos){
    console.log('map clicked')
    console.log(pos)
    addMarker(pos)

}

function setLocation(pos, title){
    console.log('setting location', pos)
    const center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      gMap.setCenter(center)
      new google.maps.Marker({
          position: center,
          map: gMap,
          title, 
        }) 

}



function addMarker(loc, title) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
    });
    return marker;
}


function _connectGoogleApi() {
    // const API_KEY = 'AIzaSyAkPIleVgYKpLNpxFBQ5blamIYW7YgdOM0'
    
    const API_KEY = 'AIzaSyCfW4zSavY4AJeMwNyqMBVFWttBi1iHd9Q'
    if (window.google) return Promise.resolve()
    // const API_KEY = ''; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function geoSearch(value) {
    const API_KEY = 'AIzaSyCfW4zSavY4AJeMwNyqMBVFWttBi1iHd9Q'
    console.log('Getting geolocation from search', value);

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${API_KEY}`)
    .then(res => res.data)

}
    


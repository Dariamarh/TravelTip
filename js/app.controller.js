import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/util-service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch
window.onCopyLink = onCopyLink

var gLastPos  

function onInit() {

    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)                
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('your position is:', pos.coords);
            mapService.setLocation(pos, 'You are here')    
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function onSearch(ev){
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]')
    console.log(elInputSearch.value)

    mapService.geoSearch(elInputSearch.value)
        .then(pos => { gLastPos = pos
            mapService.setSearchLocation(pos,elInputSearch.value )})

       
}




function onCopyLink(){

    const pos = gLastPos
    console.log('gLastPos', gLastPos)
    // pos= {
    //     lat: 35.6895,
   
    
    const queryStringParams = `?lat=${pos.lat}&lng=${pos.lng}`
    const newUrl = 'https://dariamarh.github.io/TravelTip/' + queryStringParams
    
    
    navigator.clipboard.writeText(newUrl);
    alert("Link Copied: " + newUrl);

}




  
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage-service.js'
import { utilService } from './services/util-service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch
window.onCopyLink = onCopyLink

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
        .then(res => console.log(res))

        // .then(pos => {
        //     console.log('User search position is:', pos.coords);
        //     mapService.setLocation(pos, , title)    
        // })
        // .catch(err => {
        //     console.log('err!!!', err);
        // })
}

function onCopyLink(value){
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(value);
    
    /* Alert the copied text */
    alert("Copied the text: " + value);

}

function renderLocation(locations) {
    const strHtml = locations.map(
        (loc) =>
            `<li class="list-item">
        <p class="location-name" onclick="onPanTo(${loc.lat} ,${loc.lng})">${loc.name}</p> 
            <button class="go-to-location-btn btn" onclick="onPanTo(${loc.lat},${loc.lng})">GO</button>
        <button class="del-location-btn btn" onclick="onDeleteLocation('${loc.id}')">X</button>
    </li>`
    );
    document.querySelector('.location-list').innerHTML = strHtml.join('');
}
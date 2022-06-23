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
    var locs = locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
    renderLocation(locs)
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


function onSearch(ev) {
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]')
    console.log(elInputSearch.value)

    mapService.geoSearch(elInputSearch.value)
        .then(pos => {
            gLastPos = pos
            mapService.setSearchLocation(pos, elInputSearch.value)
        })


}

function onCopyLink(value) {

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(value);

    /* Alert the copied text */
    alert("Copied the text: " + value);

}

function renderLocation(locations) {
    var strHtml = locations.map(
        (loc) =>
            `<li class="flex space-between">
        <p class="location-name">${loc.name}</p>
        <p><span>CreatedAt</span> <span>${loc.createdAt}</span></p>
                    <p><span>EditedAt</span> <span>${loc.updatedAt}</span></p>
                    <p><span>Lat</span> <span>${loc.pos.lat}</span></p>
                    <p><span>Lng</span> <span>${loc.pos.lng}</span></p> 
            <button class="go-to-location-btn btn" onclick="onPanTo(${loc.lat},${loc.lng},'${loc.name}')">GO</button>
        <button class="del-location-btn btn" onclick="deleteLoc('${loc.id}')">X</button>
    </li>`
    );
    document.querySelector('.location-list').innerHTML = strHtml.join('');
}
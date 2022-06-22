

export const mapService = {
    initMap,
    addMarker,
    onClickMap,

}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
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

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
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
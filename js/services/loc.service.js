export const locService = {
    getLocs,
    saveLocation,
}

const LOCATION_KEY = 'travelDB'
const locs = [
    { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 0, createdAt: new Date, updatedAt: new Date },
    { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 0, createdAt: new Date, updatedAt: new Date }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)

    })
}

function saveLocation(name, loc) {
    const currentLocation = {
        name,
        lat: loc.lat,
        lng: loc.lng,
        id: utils.makeId(),
    }
    locs.push(currentLocation)
    storageService.saveToStorage(LOCATION_KEY, locs)
}

import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'

export const locService = {
  getLocs,
  addLoc,
  deleteLoc
}
console.log('kjkj');
const STORAGE_KEY = 'locsDB'
console.log(STORAGE_KEY,'kjkj45645');
const locs = _createLocs()


function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000)

  })
}
function addLoc(loc, name) {
  locs.push(_createLoc(loc, name))
  storageService.save(STORAGE_KEY, locs)
}

function _createLoc(pos, name) {
  console.log(pos,'pos');
  return {
    id: utilService.makeId(),
    name,
    pos,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}


function deleteLoc(id) {
  const deletedIdx = locs.findIndex((loc) => loc.id === id)
  locs.splice(deletedIdx, 1);
  storageService.saveToStorage(STORAGE_KEY, locs)
}

function _createLocs() {
  let locs = storageService.load(STORAGE_KEY)
  // var locs = []
  if (!locs || !locs.length) {
    console.log(locs,'locs');
    locs = [
      _createLoc({ lat: 32.047104, lng: 34.832384 }, 'Greatplace'),
      _createLoc({ lat: 32.047201, lng: 34.832581 }, 'Neveragain'),
    ]
    console.log(locs,'locs2');
  }

  storageService.save(STORAGE_KEY, locs)
  return locs
}
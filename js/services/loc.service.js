import { mapService } from "./map.service.js";

import { storageService } from "./storage.service.js"

export const locService = {
    getLocs,
    getPosition,
    addLoc
}
const LOCS_CACHE_KEY = 'locsCache';


var locs;


function getLocs() {

    locs = storageService.load(LOCS_CACHE_KEY) || [];
    if (locs && locs.length) {
        return Promise.resolve(locs);
    }
    locs = getDefaultLocs();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getDefaultLocs() {
    return [
        { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: null, createdAt: Date.now() },
        { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: null, createdAt: Date.now() }
    ]
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function addLoc(locName, locPos) {
    var { lat, lng } = locPos;
    var { id } = locs[locs.length - 1];
    locs.push({ id: ++id, name: locName, lat, lng, weather: null, createdAt: Date.now() });
    storageService.save(LOCS_CACHE_KEY, locs);
    console.log('inside loc');
    return Promise.resolve(locs);

}
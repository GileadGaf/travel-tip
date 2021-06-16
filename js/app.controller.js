import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
// window.onAddMarker = onAddMarker;
// window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'))
        .then(mapService.bindMapClick);


}


// function onGetLocs() {
//     locService.getLocs()
//         .then(locs => {
//             console.log('Locations:', locs)
//             document.querySelector('.locs').innerText = JSON.stringify(locs)
//         })
// }

function onGetUserPos() {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude, 'your location')
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

// function onPanTo() {
//     console.log('Panning the Map');
//     mapService.panTo(35.6895, 139.6917);
// }
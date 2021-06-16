import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geocodeService } from './services/geocode.service.js'
window.onload = onInit;
// window.onAddMarker = onAddMarker;
// window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
window.onCopyLink = onCopyLink;
window.onGetUserPos = onGetUserPos;
window.onSearchAddress = onSearchAddress;



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'))
        .then(() => {
            mapService.bindMapClick(renderLocs);

        })
        .then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const lat = +urlParams.get('lat');
            const lng = +urlParams.get('lng');
            if (!lat || !lng) return;
            mapService.panTo(lat, lng, 'Your chosen location');
        })
        .then(renderLocs);

}

function renderLocs() {
    locService.getLocs().then(locs => {
        var strHtml = locs.map(loc => {
            // <li><a href="${getLink(loc)}">${loc.name} </a>  </li>
            return `
            <li>${loc.name}
            <button>Delete</button>
            <button>GoTo</button>
            </li>
            `
        }).join('');
        var elLocs = document.querySelector('.loc-info');
        elLocs.innerHTML = strHtml;
    })
}

function getLink({ lat, lng }) {
    var questionSignIdx = location.href.indexOf('?');

    var link = location.href.substring(0, questionSignIdx);
    return link + `?lat=${lat}&lng=${lng}`;
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

function onSearchAddress(ev) {
    console.log(ev);
    ev.preventDefault();
    var elSearchedAddress = document.querySelector('[name=searched-address]');
    if (!elSearchedAddress.value) return;
    geocodeService.getPosByAddress(elSearchedAddress.value)
        .then(pos => {
                locService.addLoc(elSearchedAddress.value, pos);
                mapService.panTo(pos.lat, pos.lng, elSearchedAddress.value);
                renderLocs();
            }

        );
}

function onCopyLink() {
    var link = 'https://gileadgaf.github.io/travel-tip/?'
    navigator.clipboard.writeText('https://www.google.com')
        .then(() => { alert('Copy successful'); })
        .catch((error) => { alert(`Copy failed! ${error}`); });
}
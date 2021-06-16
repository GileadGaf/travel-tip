import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    bindMapClick
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                    document.querySelector('#map'), {
                        center: { lat, lng },
                        zoom: 16
                    })
                // console.log('Map!', gMap);
        })

}


function addMarker(loc, title) {
    const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30)
    };
    console.log('marker');
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title,
        icon: svgMarker
    });
    console.log(marker);
    return marker;
}

function panTo(lat, lng, title) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    addMarker(laLatLng, title);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyD_dzbpnWZjTFIWd8IkWgZodmBAJqzBhr4'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function bindMapClick(onSuccess) {
    gMap.addListener('click', function(ev) {
        const pos = ev.latLng.toJSON();
        var locName = prompt('Give this location a name');
        if (locName) {
            locService.addLoc(locName, pos)
            panTo(pos.lat, pos.lng, locName);
            onSuccess();


        }
    });

}
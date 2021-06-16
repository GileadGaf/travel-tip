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
            console.log('Map!', gMap);
        })
}

function addMarker(loc, title) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
    });
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

function bindMapClick() {
    gMap.addListener('click', function(ev) {
        const pos = ev.latLng.toJSON();
        var locName = prompt('Give this location a name');
        if (locName) {
            locService.addLoc(locName, pos)

        }


    });

}
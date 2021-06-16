export const geocodeService = {
    getPosByAddress,
    getAddressByPos
};



const API_KEY = 'AIzaSyD_dzbpnWZjTFIWd8IkWgZodmBAJqzBhr4';

function getPosByAddress(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
    return axios.get(url)
        .then(res => res.data.results[0].geometry.location);

}

function getAddressByPos(pos) {
    var { lat, lng } = pos;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    return axios.get(url)
        .then(res => res.data.results[0]['formatted_address']);


}
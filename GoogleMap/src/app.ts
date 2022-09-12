import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyCMTW6x5nRAHFep6GOqELec9YedZh0pnVw';

type GoogleGeocodingResponse = {
  results: { 
    geometry: { location: {lat: number, lng: number}}
  }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${GOOGLE_API_KEY}`)
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location');
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map })
    })
    .catch((error) => console.log(error));
}

form.addEventListener('submit', searchAddressHandler)
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import account from '../_mock/account';

export default function MapView() {
  const [listalibros, setListalibros] = useState([]);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    const obtenerLibrosCookie = () => {
      const librosCookie = Cookies.get('listalibros');
      const latitudCookie = Cookies.get('latitud');
      const longitudCookie = Cookies.get('longitud');

      return {
        listalibros: JSON.parse(librosCookie || '[]'),
        latitud: parseFloat(latitudCookie || 0),
        longitud: parseFloat(longitudCookie || 0),
      };
    };

    const { listalibros, latitud, longitud } = obtenerLibrosCookie();

    setListalibros(listalibros);
    setLatitud(latitud);
    setLongitud(longitud);
  }, []);

  const markers = listalibros.map((place, index) => (
    <Marker
      key={place.id}
      position={[parseFloat(place.lat) + index * 0.001, parseFloat(place.lng) + index * 0.001]}
      icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
    >
      <Popup>
        <div>
          <Link to="/dashboard/book">
            <h3>{place.titulo}</h3>
          </Link>
          <p>{place.idlibro}</p>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <>
      {latitud !== 0 && longitud !== 0 ? (
        <MapContainer style={{ height: '70vh', width: '72vw' }} center={[latitud, longitud]} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </>
  );
}

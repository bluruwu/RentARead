import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import account from '../_mock/account';

export default function MapView() {
  // const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Obtener los datos de las cookies
    const obtenerLibrosCookie = () => {
      const listalibros = Cookies.get('listalibros');

      return {
        listalibros,
      };
    };

    // Actualizar el estado con los datos de las cookies
    setPlaces(obtenerLibrosCookie());
  }, []);

  const [places, setPlaces] = useState(places);

  const markers = places.map((place) => (
    <Marker
      position={[parseFloat(place.lat) + Math.random() * 0.001, parseFloat(place.lng) + Math.random() * 0.001]}
      icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
    >
      <Popup>
        <div>
          <Link to="/dashboard/book">
            <h3>{place.nombre_libro}</h3>
          </Link>
          <p>{place.id_libro}</p>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <MapContainer
      style={{ height: '70vh', width: '72vw' }}
      center={[String(account.latitud), String(account.longitud)]}
      zoom={13}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

import React, { useState } from 'react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button, Stack } from '@mui/material';
import Iconify from '../components/iconify';
import 'leaflet/dist/leaflet.css'
import account from '../_mock/account';

export default function MapView() {

  const [places, setPlaces] = useState([[3.4204253607806145, -76.53390369617786], [3.4028125628344723, -76.51572594747365], [3.444786, -76.534775], [3.461485, -76.511412], [3.444735, -76.535533], [3.409793, -76.512814], [3.396653, -76.548995], [3.458980, -76.498198], [3.445731, -76.493388], [3.438700, -76.473996], [3.430144, -76.473138], [3.421758, -76.478792], [3.440034, -76.514080], [3.439250, -76.506964],[3.381579, -76.534077], [3.374063, -76.516250], [3.370789, -76.523031], [3.416209, -76.495876], [3.414053, -76.500207], [3.412897, -76.511480], [3.400205, -76.540375], [3.481403, -76.518329], [3.450606, -76.525978], [3.440733, -76.516978], [3.403616, -76.511289]]);

  const markers = account.listaCoordenadas.map(place => 
    <Marker position={place.coordenadas} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
      <Popup>
        {place.nombre}
      </Popup>
    </Marker>
  )

  return (

    <MapContainer style={{ height: "80vh", width: "72vw" }} center={[3.43722, -76.5225]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers}
    </MapContainer>

  );
}

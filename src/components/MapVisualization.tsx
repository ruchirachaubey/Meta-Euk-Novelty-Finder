import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  lat: number
  lng: number
  depth: number
}

interface Species {
  name: string
  locations: Location[]
}

interface MapVisualizationProps {
  species: Species[]
}

export default function MapVisualization({ species }: MapVisualizationProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    })
  }, [])

  return (
    <div className="h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Species Distribution Map</h2>
      <MapContainer 
        center={[-33.0, 152.0]} 
        zoom={8} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {species.map((specimen, index) => (
          specimen.locations.map((location, locIndex) => (
            <Marker 
              key={`${index}-${locIndex}`} 
              position={[location.lat, location.lng]}
            >
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-medium">{specimen.name}</h3>
                  <p>Lat: {location.lat.toFixed(4)}°S</p>
                  <p>Lng: {location.lng.toFixed(4)}°E</p>
                  <p>Depth: {location.depth}m</p>
                </div>
              </Popup>
            </Marker>
          ))
        ))}
      </MapContainer>
    </div>
  )
}
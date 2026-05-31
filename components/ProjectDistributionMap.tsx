'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Location {
  id: string
  name: string
  projectType: 'residential' | 'commercial' | 'industrial'
  lat: number
  lng: number
  address: string
}

interface ProjectDistributionMapProps {
  locations: Location[]
}

function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [locations, map])
  
  return null
}

const markerColors = {
  residential: '#3b82f6',
  commercial: '#22c55e',
  industrial: '#eab308'
}

function getMarkerIcon(projectType: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: ${markerColors[projectType as keyof typeof markerColors]};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    popupAnchor: [0, -12],
    className: 'custom-marker'
  })
}

export default function ProjectDistributionMap({ locations }: ProjectDistributionMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [validLocations, setValidLocations] = useState<Location[]>([])

  useEffect(() => {
    setIsMounted(true)
    const valid = locations.filter(loc => loc.lat !== 0 && loc.lng !== 0)
    setValidLocations(valid)
  }, [locations])

  if (!isMounted) {
    return (
      <div style={{ height: '450px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666' }}>Loading map...</p>
      </div>
    )
  }

  if (validLocations.length === 0) {
    return (
      <div style={{ height: '450px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
        <p style={{ color: '#666' }}> No location data available</p>
        <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', maxWidth: '80%' }}>
          Add addresses to your survey responses to see them on the map.
        </p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', height: '450px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={getMarkerIcon(location.projectType)}
          >
            <Popup>
              <div style={{ padding: '4px', minWidth: '180px' }}>
                <strong style={{ display: 'block', marginBottom: '8px' }}>{location.name}</strong>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>
                  <strong>Type:</strong> {location.projectType.charAt(0).toUpperCase() + location.projectType.slice(1)}
                </p>
                <p style={{ margin: '4px 0', fontSize: '11px', color: '#666' }}>{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <FitBounds locations={validLocations} />
      </MapContainer>
      
      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'white',
        padding: '10px 14px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        zIndex: 1000,
        border: '1px solid #ccc',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Project Types</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: '#3b82f6', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ color: '#333' }}>Residential</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: '#22c55e', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ color: '#333' }}>Commercial</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: '#eab308', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ color: '#333' }}>Industrial</span>
        </div>
      </div>
    </div>
  )
}
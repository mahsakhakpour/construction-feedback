export interface Coordinates {
  lat: number
  lng: number
  displayName: string
}

export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    )
    const data = await response.json()
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      }
    }
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

import { Marker, TileLayer, MapContainer, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import './index.css'
import L from "leaflet";
import { useEffect } from "react";


function CenterView(props: { position: any; }){
  const {position} = props
  const map = useMap()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(position){
      map.setView(
        L.latLng(position?.lat, position?.lon),
        map.getZoom(),
        {
          animate:true
        }
      )
    }

  }, [map, position])
  
  return null

 
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Map(props: { position: any; }) {
  const{position} = props
  // 35.861660, 104.195396 previous testing
  // const position = [35.861660, 104.195396]
  const location = [position?.lat, position?.lon]
  const placeHolder = [getRandomInt(100), getRandomInt(100)]
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  
    return(
    <>
    <div className='map-container'>
    <div className="map-box">
        <MapContainer center={placeHolder} zoom={13} scrollWheelZoom={false} style={{width: '100%', height:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=ZZyAQlM36jevo6tFrGct"
        />
        { position && (
        <Marker position={location}>
          <Popup>
          Latitude : {location[0]}, Longitude : {location[1]}
          </Popup>
        </Marker>
        )}
        <CenterView position={position}></CenterView>
        </MapContainer>
        
    </div>
    </div>
    </>
    )
}


import { Marker, TileLayer, MapContainer, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import './index.css'
import L from "leaflet";
import { useEffect } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CenterView(props: { position: any; }){
  const {position} = props
  const map = useMap()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(position){
      map.setView( // sets view to current chosen position
        L.latLng(position?.lat, position?.lon),
        map.getZoom(), // animates zoom
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
  const{position} = props // takes in object position as prop parameter
  // 35.861660, 104.195396 previous testing
  // const position = [35.861660, 104.195396]
  const location = [position?.lat, position?.lon]
  const placeHolder = [getRandomInt(50), getRandomInt(50)] // initialize position randomly
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)+5;
  }
  
    return(

    // containerizes the map NEEDS PROPER style for functionality (not in the document)
    // {position && ()}if there is a current position set both the marker and the popup to the proper lat/lng coordinates
    // CenterView: calls centerview to update map view/animation
    <>
    <div className='map-container'>
      
    <div className="map-box">
      
        <MapContainer center={(placeHolder) ? placeHolder : [0,0]} zoom={13} scrollWheelZoom={false} style={{width: '100%', height:'100%'} } > 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=ZZyAQlM36jevo6tFrGct" // chosen map theme based on maptiler! needs x,y,z to work
        />
        
        { position && (
          
        <Marker position={(location) ? location :[0,0]}>
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

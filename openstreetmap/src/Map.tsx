
import { Marker, TileLayer, MapContainer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import './index.css'



export default function Map() {


    const position = [35.861660, 104.195396]
    return(
    <div className='map-container'>
    <div className="map-box">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: '100%', height:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
          Latitude : {position[0]}, Longitude : {position[1]}
          </Popup>
        </Marker>
        </MapContainer>
    </div>
    </div>
    )
}

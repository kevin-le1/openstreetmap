import './index.css'
import { useState } from 'react';

const nomin_url = 'https://nominatim.openstreetmap.org/search?'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Search(props: { position: any; setPosition: any; }) {
    const {setPosition} = props
    const[search, setSearch] = useState("") // string
    const[listLocations, setListLocations] = useState([]) // array
    
    return(
    <>
    <div className='text-container'>
    <input type="text" className="text-box" placeholder="Input Location" 
        value = {search} onChange={(event)=> {setSearch(event.target.value)}}/>
    <button className = "button" onClick ={() => {
        const para = {
            // query
            q: search,
            // format
            format: 'json',
            // address set to 1 id
            addressdetails: '1',
            // not going to be used in this project
            polygon_geojson: '0',
        }
        const paraStr = new URLSearchParams(para).toString()
        const req = {
            method: 'GET',
        }
        fetch(`${nomin_url}${paraStr}`, req)
        .then (response => response.text())
        .then (result => {
            console.log(JSON.parse(result))
            setListLocations(JSON.parse(result))
        })
        .catch (err => console.log({err}))
    }}
    >Search</button>
    <div className='dropdown'>
    <button className = 'button2'>Locations</button>
    <div className="dropdown-content">
    {listLocations.map((item) => {
            return (
              <div key={item?.place_id}>
                <button className='button3' onClick={()=>{
                setPosition(item)
                }}> {item?.display_name} </button>
              </div>
            );
    })}
    </div>
    </div>
    </div>

    
    </>
    )
}

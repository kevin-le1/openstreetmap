import './index.css'
import { useState } from 'react';

const nomin_url = 'https://nominatim.openstreetmap.org/search?'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Search(props: { position: any; setPosition: any; }) { // takes in parameters of both position and setposition
    const {setPosition} = props // only changes setPosition property
    const[search, setSearch] = useState("") // string
    const[listLocations, setListLocations] = useState([]) // array
    
    return(

    // para : the parameters based on the api url, nomin_url adds these parameters to the query search
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
        // changes to string before adding
        const paraStr = new URLSearchParams(para).toString()
        const req = {
            method: 'GET', // GETS the data
        }
        fetch(`${nomin_url}${paraStr}`, req)
        .then (response => response.text())
        .then (result => {
            // parses the information needed
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
                if (item) {
                    setPosition(item);
                  }
                }}> {item?.display_name} </button>
              </div>
            );
        
    })}

    </div>
    </div>
    </div>

    </>

    // listLocations.map creates a list of the locations that have been selected in the previous search query
    )
}

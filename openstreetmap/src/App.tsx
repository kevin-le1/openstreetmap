
import { useState } from "react";
import Map from "./Map"
import Search from "./Search"

function App() {
  const [position, setPosition] = useState()
  console.log(position)
  return (
    <>
      <Map position = {position}></Map>
      <Search position={position} setPosition={setPosition}></Search>
    </>
  );
}

export default App

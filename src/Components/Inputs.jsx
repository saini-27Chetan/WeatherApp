import React, { useState } from 'react'
import { UilSearch, UilLocationPoint  } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState(""); 

  const SerachHandler = () => {
    if(city!=="")
      setQuery({q: city})
  }

  const locationHandler = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;

        setQuery({lat, lon});
      })
    }
  }

  const unitChangeHandler = (e) => {
    const selectedUnit=e.currentTarget.name;
    if(units!==selectedUnit){
      if(selectedUnit==="celcius")
        toast.success("Unit changed to Celcius");
      else {
        toast.success("Unit changed to Fahrenheit");
      }
      setUnits(selectedUnit==="celcius"? "metric" : "imperial");
    }
  }
  
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input value={city} onChange={(e) => setCity(e.currentTarget.value)} type="text" placeholder='Search for city...' className='text-xl font-light p-2 focus:outline-none capitalize placeholder:lowercase'/>
            <UilSearch size={25} onClick={SerachHandler} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
            <UilLocationPoint size={25} onClick={locationHandler} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
        </div>
        
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='celcius' className='text-xl text-white font-light hover:scale-125 transition:ease-out' onClick={unitChangeHandler}>°C</button>
                <p className='text-xl text-white mx-1'>|</p>

            <button name='fahrenheit' className='text-xl text-white font-light hover:scale-125 transition:ease-out' onClick={unitChangeHandler}>°F</button>
        </div>
    </div>
  )
}

export default Inputs
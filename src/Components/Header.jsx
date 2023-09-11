import React from 'react'

function Header({setQuery}) {
    const cities =[
        {
            id:1,
            title: "London"
        },
        {
            id:2,
            title: "Tokyo"
        },
        {
            id:3,
            title: "Sydney"
        },
        {
            id:4,
            title: "Delhi"
        },
        {
            id:5,
            title: "Berlin"
        }
    ]
  return (
    <div className="flex items-center justify-around my-6">
        {cities.map((city) =>(
            <button key={city.id} onClick = {() => setQuery({q: city.title})} className='text-white text-lg font-medium hover:underline hover:text-xl'>
                {city.title}
            </button>
        ))}    
    </div>
  )
}

export default Header
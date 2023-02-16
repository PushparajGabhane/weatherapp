import React, { useEffect, useState } from 'react'

const Search = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("delhi");
    const [fav, setFav] = useState([]);
    useEffect(() => {
        function fetchData() {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34efc8708f73b83ddd3fc0e89677958d`)
                .then(res => res.json())
                .then(json => { json.cod === 200 ? setData(json) : setData(null) })
        };
        fetchData();
    }, [city])

    return (
        <>
            <input type="search" onChange={(e) => { setCity(e.target.value) }} />
            <button onClick={() => { if (data !== null) { setFav([...fav, city]) } }}>Add to Favourite</button>
            <h1>Favourites</h1>
            {fav.length !== 0 ? fav.map((place,index) => {
                return (
                    <li key={index} onClick={() => setCity(place)}>{place}</li>
                )
            }) : <p>No Favourite City Added</p>}
            {data ?
                <>
                    <h2>Location : {data.name}</h2>
                    <h3>Country : {data.sys.country}</h3>
                    <h4>Temperature : {data.main.temp} <sup>o</sup>F</h4>
                    <h5>Min_Temp : {data.main.temp_min} <sup>o</sup>F</h5>
                    <h5>Max_Temp : {data.main.temp_max} <sup>o</sup>F</h5>
                    <h4>Weather : {data.weather[0].main}</h4>
                </> :
                <h2>No Data Found</h2>
            }
        </>
    )
}

export default Search
import React, { useState,ChangeEvent } from 'react';
import { useEffect } from 'react';
import './weathercard.css';
import { FiSearch } from "react-icons/fi";
import { WiCloudy,WiDaySunny,WiFog,WiRain  } from "react-icons/wi";
import { TiWeatherStormy,TiWeatherPartlySunny  } from "react-icons/ti";
import { RiWaterPercentFill } from "react-icons/ri";
import { SiApacheairflow } from "react-icons/si";

export default function Weather(){
    var apikey = "817ed3e8f1a60dbf4513afb803241561";
    const[weather, setweather]=useState([]);
    const[loc, setLoc]=useState("Chennai");
    

    const [message, setMessage] = useState('');
            const [updated, setUpdated] = useState(message);
            const handleChange = (event) => {
            setMessage(event.target.value);
            };
            const handleClick = (data) => {
            // 👇 "message" stores input field value
            setUpdated(message);
                data.preventDefault();
                console.log(data.target[0].value);
                setLoc(data.target[0].value);
            };
            
            useEffect(()=>{
            console.log("didupdate")
        const apiCall = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apikey}`);
        const data = apiCall.then((res)=>res.json());
        data.then((items)=>{console.log(items)
            setweather([items.weather[0].main,items.weather[0].id,items.name,items.main.humidity,items.wind.speed,items.name])});
        },[loc]);
          
   


    return(
        <div className='over-card'>
            <div className='card'>
                <form onSubmit={(e)=>handleClick(e)}>
                <input type='text' placeholder='Enter Your City Here..'id="message"
        name="message"
        onChange={handleChange}/>
                <button className='searchbar' type="submit"><FiSearch/></button>
                </form>
                <p className='cityname'>{`City : ${message}`}</p>
                <p className='cityname'>{`Weather Location : ${weather[5]}`}</p>
                <p className='climate'>
                
                    {weather[0] == "Clouds" ?
                        <span className='cloud'><WiCloudy/></span> :weather[0] == "Sunny" ?
                        <span className='sunny'><WiDaySunny/></span> : weather[0] == "Haze" ?
                        <span className='fog'><WiFog/></span> : weather[0] == "Rainy" ?
                        <span className='cloud'><WiRain/></span> : weather[0] == "Clear" ?
                        <span className='sunrain'><TiWeatherPartlySunny/></span> : weather[0] =="Mist" ?
                        <span className='fog'><WiFog/></span> :
                        <span className='stromy'><TiWeatherStormy/></span>
                    }
                    </p>
                <p className='weathername'>{weather[0]}</p>
                <div className='sub'>
                    <section>
                        <p className='cityname'>Humidity</p>
                        <p className='cloud climate'><RiWaterPercentFill/></p><p className='weathername'>{weather[3]}</p>
                    </section>
                    <section>
                        <p className='cityname'>Wind Speed</p>
                        <p className='fog climate'><SiApacheairflow/></p><p className='weathername'>{weather[4]}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
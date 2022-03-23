import React, { useEffect } from 'react'
import {useState} from 'react'
import search from './search.png';
import { BrowserRouter, Link, Switch } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState({})
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const[loading, setLoading] = useState(false)
  const current = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
 
  const apikey = '4b90c18cd6c70762d3fe8863d18822c3';
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date .getDate();
const saveposition = (position)=>{
  setX(position.coords.latitude);
  setY(position.coords.longitude);
  console.log(x)
}
  const fetchweather = async () => {
    if (navigator.geolocation){
     await window.navigator.geolocation.getCurrentPosition(saveposition);
      setLoading(true)
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&units=imperial&appid=${apikey}`).then((res) => {
        return res.json();
      }).then((data) => {
        setLoading(false)
        setData(data);
        console.log(data);
      });
    }
    }
     
    
    
   

  useEffect(()=>{
    fetchweather();
  },[x,y])
  return (
  <>
  {loading?(<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><p style={{marginTop:'10%'}}>Forecasting...</p></div>):( 
  
  <div className='container'>
   
   <Link to="search" style={{float:'right', position: 'relative', color:'white',
  right:'-80%'}}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></Link>
   
    
    <div className='top'>
      <div>
        {day + "/" + month + "/" + year}
      </div>
      <div className='location'>
        <p>{data?.name} / {data.sys?data.sys.country:null}</p>
      </div>
      <div className='temp'>
        <h1>{data.main ? Math.round(data.main.temp):null}&#176;F</h1>
      </div>
      <div>
        <span style={{fontSize:'1.3rem'}}>Max_temp: {data.main?data.main.temp_max:null}&#176;F</span><br/> <span>Min_temp: {data.main?data.main.temp_min:null}&#176;F</span>
      </div>
      <div className='description'>
        <p>{ data.weather ? data?.weather[0].main : null}</p>
      </div>


    </div>
    <div className='bottom'>
      <div className='feels'>
        <p className='bold'>{data.main?Math.round(data.main.feels_like):null}&#176;F</p>
        <p>Main</p>
      </div>
      <div className='humidity'>
        <p className='bold'>{data.main?data.main.humidity:null} %</p>
        <p>Hum</p>
      </div>
      <div className='wind'>
        <p className='bold'>
        {data.wind?data.wind.speed:null} MPH
        </p>
        <p>Wind</p>
      </div>
    </div>


  </div>
 )}
   


  </>


  )
}

export default Home;
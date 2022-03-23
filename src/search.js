import React, { useState } from 'react'

const Search = () => {
    const [data, setData] = useState({})
    const [city, setCity] = useState('');
    const [country,setCountry] = useState('');
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(true)
    const [errormsg, setErrormsg] = useState('')
    const apikey = '4b90c18cd6c70762d3fe8863d18822c3';
    const iconurl = "http://openweathermap.org/img/w/"
    const fetchweather = () => {
        if(city == "" || country == ""){
            setErrormsg("  Inputs cannot be empty");
            setError(true);
        }
        if(city !== ""  && country !== "") {
            setLoading(true)
            setError(true)
           
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country},${city}&units=imperial&appid=${apikey}`).then((res) => {
              if(!res.ok){
                  throw Error("Failed to Fetch Data")
              }
              if(res.staus == 400){
                  throw Error("Data not Found")
              }
            return res.json();
            }).then((data) => {
                setCity('')
                setCountry('')
                setError(false)
              setLoading(false)
              setData(data);
              console.log(data);
            }).catch((err)=>{
                setErrormsg(err.message)
                setLoading(false)
                setError(true)
                
            })
            
            ;
          
          }
        }
       
        

  return (
    <><div className="input" >
          <input type='text' placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)}/>
          <input type='text' placeholder='Country'  value={country} onChange={(e)=>setCountry(e.target.value)}/>
          <button type='submit' onClick={fetchweather}>Get Forecast</button>
      </div>
      <div>{loading && <h3>Loading...</h3>}</div>
     {error?(<div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'150px'}}>
          <p style={{background:'rgba(255,0,4,0.3)',padding:'10px'}}>{errormsg}</p>
      </div>): ( 
           <><div className='container'>
                   
                   <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <img src={data.weather?iconurl + data.weather[0].icon + ".png": null} style={{width:'50px'}}/>
                        </div>
                         
                      <div className='top'>
                          <div className='location'>
                              <p>{data?.name} / {data.sys ? data.sys.country : null}</p>
                          </div>
                          <div className='temp'>
                              <h1>{data.main ? Math.round(data.main.temp) : null}&#176;F</h1>
                          </div>
                          <div>
                              <span style={{ fontSize: '1.3rem' }}>Max_temp: {data.main ? data.main.temp_max : null}&#176;F</span><br /> <span>Min_temp: {data.main ? data.main.temp_min : null}&#176;F</span>
                          </div>
                      
                          <div className='description'>
                              <p>{data.weather ? data?.weather[0].main : null}</p>
                          </div>

                      </div>
                      <div className='bottom'>
                          <div className='feels'>
                              <p className='bold'>{data.main ? Math.round(data.main.feels_like) : null}&#176;F</p>
                              <p>Main</p>
                          </div>
                          <div className='humidity'>
                              <p className='bold'>{data.main ? data.main.humidity : null} %</p>
                              <p>Hum</p>
                          </div>
                          <div className='wind'>
                              <p className='bold'>
                                  {data.wind ? data.wind.speed : null} MPH
                              </p>
                              <p>Wind</p>
                          </div>
                      </div>

                    
                  </div>
                  
                 </>
 
 )} 

    
      
     </>
  
  )
}

export default Search;
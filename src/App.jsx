import { useState } from 'react'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather'
import Forecast from './components/forecast'
import './App.css'
const { VITE_WEATHER_API_URL, VITE_WEATHER_API_KEY } = import.meta.env

function App () {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ')

    const currentWeatherFetch = fetch(
      `${VITE_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}&units=metric`
    )
    const forecastFetch = fetch(
      `${VITE_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}&units=metric`
    )

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forcastResponse = await response[1].json()
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forcastResponse })
      })
      .catch(console.log)
  }
  return (
    <main className='container'>
      <h1>Weather Forecast</h1>
      <Search onSearchChange={handleOnSearchChange} />
      <section className='mainSection'>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </section>
    </main>
  )
}

export default App

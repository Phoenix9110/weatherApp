/* eslint-disable react/prop-types */
import './index.css'

const CurrentWeather = ({ data }) => {
  return (
        <article className="weather">
          <section className='top'>
            <p className="city">{ data.city }</p>
            <p className="weather-description">{ data.weather[0].description }</p>
          <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}></img>
          </section>
          <section className="bottom">
            <p className="temperature">{ Math.round(data.main.temp) }°C</p>
            <section className="details">
              <section className="parameter-row">
                <span className="parameter-label top">Details</span>
              </section>
              <section className="parameter-row">
                <span className="parameter-label">Feels like</span>
                <span className="parameter-value">{ Math.round(data.main.feels_like) }°C</span>
              </section>
              <section className="parameter-row">
                <span className="parameter-label">Wind</span>
                <span className="parameter-value">{ data.wind.speed } ㎧</span>
              </section>
              <section className="parameter-row">
                <span className="parameter-label">Humidity</span>
                <span className="parameter-value">{ data.main.humidity } %</span>
              </section>
              <section className="parameter-row">
                <span className="parameter-label">Pressure</span>
                <span className="parameter-value">{ data.main.pressure } hPa</span>
              </section>
            </section>
          </section>
        </article>
  )
}
export default CurrentWeather

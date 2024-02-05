/* eslint-disable react/prop-types */
import { AsyncPaginate } from 'react-select-async-paginate'
import { useState } from 'react'
import './search.css'

const { VITE_GEO_API_URL, VITE_GEO_API_RAPIDAPI_KEY, VITE_GEO_API_RAPIDAPI_HOST } = import.meta.env
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': VITE_GEO_API_RAPIDAPI_KEY,
    'X-RapidAPI-Host': VITE_GEO_API_RAPIDAPI_HOST
  }
}

const Search = ({ onSearchChange }) => {
  const [search, updateSearch] = useState(null)

  const loadOptions = (inputValue) => {
    return fetch(
      `${VITE_GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`,
      API_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => {
        const returningData = response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`
          }
        })
        return {
          options: returningData
        }
      })
      .catch((error) => console.error(error))
  }

  // Custom styles
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '5px',
      border: '2px solid #ccc',
      boxShadow: state.isFocused ? '0 0 0 2px #9393' : null
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#9393' : null,
      color: state.isFocused ? 'black' : null,
      margin: state.isFocused ? '0px' : null
    }),
    listbox: (provided, state) => ({
      ...provided,
      margin: state.isFocused ? '-100px' : null
    })
  }

  const handleOnChange = (searchData) => {
    updateSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate
      placeholder='Search for city'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  )
}
export default Search

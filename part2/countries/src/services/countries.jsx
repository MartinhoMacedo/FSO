import axios from 'axios'
const countryNameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountry = (name) =>
      axios.get(`${countryNameUrl}/${name}`).then(response => response.data)

const getAll = () => axios.get(baseUrl).then(response => response.data)

export default { getCountry, getAll }

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const getAll = () => axios.get(baseUrl).then(response => response.data)


export default { create, getAll }

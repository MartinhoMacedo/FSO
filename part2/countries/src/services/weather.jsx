import axios from 'axios'
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`
const iconsUrl = 'https://openweathermap.org/img/wn/{icon}@2x.png'

const getWeather = (city) =>
      axios.get(baseUrl.replace("{city}", city)).then(response => response.data)

const getIcon = (code) => iconsUrl.replace("{icon}", code)

export default {getWeather, getIcon}

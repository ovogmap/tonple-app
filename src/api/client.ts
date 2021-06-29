import axios from 'axios'
import { BASE_URL } from '../constants/api'

const client = axios.create({
  baseURL: BASE_URL,
})

export default client

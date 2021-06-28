import axios from 'axios'
import { BASE_URL, TOKEN } from '../constants/api'

export default async function fetchPosts(type: string, page: number) {
  const res = await axios.get(`${BASE_URL}${TOKEN}/${type}?page=${page}`)
  return res
}

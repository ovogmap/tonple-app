import client from '../api/client'
import PostType from '../interface/post.interface'
import { AxiosResponse } from 'axios'

export default async function fetchSearchPost(
  type: string,
  keyword: string
): Promise<AxiosResponse<PostType[]>> {
  const res = await client.get<PostType[]>(`/${type}-posts?search=${keyword}`)
  return res
}

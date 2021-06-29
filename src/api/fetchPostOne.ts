import client from '../api/client'
import PostType from '../interface/post.interface'
import { AxiosResponse } from 'axios'

export default async function fetchPostOne(
  type: string,
  id: string
): Promise<AxiosResponse<PostType>> {
  const res = await client.get<PostType>(`/${type}-posts/${id}`)
  return res
}

import client from '../api/client'
import PostType from '../interface/post.interface'
import { AxiosResponse } from 'axios'

export default async function fetchPosts(
  type: string,
  page: number
): Promise<AxiosResponse<PostType[]>> {
  const res = await client.get<PostType[]>(`/${type}-posts?page=${page}`)
  return res
}

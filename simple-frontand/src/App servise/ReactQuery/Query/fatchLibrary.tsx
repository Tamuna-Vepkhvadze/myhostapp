import { bookUrl } from "../../axsios/MyAxiosWrapper"


const fetchLibrary =async (subject: string, page: number = 0, limit: number = 15) => {
    if (!subject) return [];
  const offset = page * limit;
 const result = await bookUrl.get(`/subjects/${encodeURIComponent(subject)}.json`, {
    params: { limit, offset },
  })
  return result.data
}

export default fetchLibrary
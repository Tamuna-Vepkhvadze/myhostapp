
import { MyAxiosWrapper } from '../../axsios/MyAxiosWrapper'
import type { WechselnPasvordType } from '../../../My App/components/interface/interface'

const WechselnPasvord = async (data: WechselnPasvordType) => {
    const result = await MyAxiosWrapper.post("/api/change-password", data)
    return result.data
}

export default WechselnPasvord
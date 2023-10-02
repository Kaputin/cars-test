import axios, { CancelTokenSource } from 'axios'
import { PaginationPayload, VechiclesSuccessResponse } from '@/types/vechicles'

const vechiclesApiCall = async (
  params?: PaginationPayload,
  cancelToken?: CancelTokenSource,
): Promise<VechiclesSuccessResponse> => {
  const { data } = await axios.get('/cars-test', {
    cancelToken: cancelToken?.token,
    params,
  })
  return data
}

export { vechiclesApiCall }

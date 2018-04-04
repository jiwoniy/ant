import Axios from '@/plugins/axios'

import memoizeInstance from '@/utils/memoize'
// import generateQueryParam from '@/utils/generateQueryParam';
// import typeCheckApi from './typeCheckApi';

const baseUrl = 'ant'
const path = {
  fetchMessages (params = {}) {
    return Axios.get(`${baseUrl}/message`, { params })
  },
  changeMessageStatus (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/message/${messageId}/check`, params)
  },
  lockMessageStatus (messageId, params = {}) {
    return Axios.put(`${baseUrl}/message/${messageId}/lock`, params)
  },
  skipMessageStatus (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/message/${messageId}/skip`, params)
  }
}

const wrapperPath = {}

memoizeInstance.setMemoizeFunction(['fetchMessages'])
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

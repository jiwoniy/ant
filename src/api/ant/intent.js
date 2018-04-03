import Axios from '@/plugins/axios'

import memoizeInstance from '@/utils/memoize'
// import generateQueryParam from '@/utils/generateQueryParam';
// import typeCheckApi from './typeCheckApi';

const baseUrl = 'ant'
const path = {
  fetchIntent (params = {}) {
    return Axios.get(`${baseUrl}/intent`, { params })
  },
  postIntent (params = {}) {
    return Axios.post(`${baseUrl}/intent`, { params })
  },
  putIntent (messageId, params = {}) {
    return Axios.put(`${baseUrl}/intent/${messageId}`, { params })
  },
  patchIntent (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/intent/${messageId}`, { params })
  },
  deleteIntent (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/intent/${messageId}`, { params })
  }
}

memoizeInstance.setMemoizeFunction(['fetchIntent'])
const wrapperPath = {}
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

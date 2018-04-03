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
  putIntent (params = {}) {
    return Axios.put(`${baseUrl}/intent`, { params })
  },
  patchIntent (params = {}) {
    return Axios.patch(`${baseUrl}/intent`, { params })
  },
  deleteIntent (params = {}) {
    return Axios.patch(`${baseUrl}/intent`, { params })
  }
}

memoizeInstance.setMemoizeFunction(['fetchIntent'])
const wrapperPath = {}
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

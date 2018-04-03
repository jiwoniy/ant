import Axios from '@/plugins/axios'

import memoizeInstance from '@/utils/memoize'
// import generateQueryParam from '@/utils/generateQueryParam';
// import typeCheckApi from './typeCheckApi';

const baseUrl = 'ant'
const path = {
  fetchEntity (params = {}) {
    return Axios.get(`${baseUrl}/entity`, { params })
  },
  postEntity (params = {}) {
    return Axios.post(`${baseUrl}/entity`, { params })
  },
  putEntity (messageId, params = {}) {
    return Axios.put(`${baseUrl}/entity/${messageId}`, { params })
  },
  patchEntity (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/entity/${messageId}`, { params })
  },
  deleteEntity (messageId, params = {}) {
    return Axios.patch(`${baseUrl}/entity/${messageId}`, { params })
  },
  fetchEntityCategory (params = {}) {
    return Axios.get(`${baseUrl}/entity/category`, { params })
  }
}

memoizeInstance.setMemoizeFunction(['fetchEntity', 'fetchEntityCategory'])
const wrapperPath = {}
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

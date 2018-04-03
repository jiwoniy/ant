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
  putEntity (params = {}) {
    return Axios.put(`${baseUrl}/entity`, { params })
  },
  patchEntity (params = {}) {
    return Axios.patch(`${baseUrl}/entity`, { params })
  },
  deleteEntity (params = {}) {
    return Axios.patch(`${baseUrl}/entity`, { params })
  }
}

memoizeInstance.setMemoizeFunction(['fetchEntity'])
const wrapperPath = {}
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

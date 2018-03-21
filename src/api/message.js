import Axios from '@/plugins/axios'

import memoizeInstance from '@/utils/memoize'
// import generateQueryParam from '@/utils/generateQueryParam';
// import typeCheckApi from './typeCheckApi';

const baseUrl = ''
const path = {
  // // dashboard
  getMessage (params = {}) {
    return Axios.get(`${baseUrl}/message`, { params })
  }
}

const wrapperPath = {}
Object.keys(path).forEach((methodName) => {
  wrapperPath[methodName] = memoizeInstance.memoize(path[methodName])
})

export default wrapperPath

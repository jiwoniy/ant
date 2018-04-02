import Axios from '@/plugins/axios'

const baseUrl = 'file/upload/excel'
const path = {
  postFileUpload (file) {
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    if (file) {
      let formData = new FormData()
      formData.set('file', file)
      return Axios.post(`${baseUrl}`, formData)
    }
  }
}

export default path

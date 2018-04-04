import Axios from '@/plugins/axios'

const baseUrl = 'accounts'
const path = {
  getUser (userId) {
    return Axios.get(`${baseUrl}/${userId}/privacy`)
  },
  token (user) {
    return Axios.post(`${baseUrl}/token`, {
      username: user.email,
      password: user.password
    })
  }
}

export default path

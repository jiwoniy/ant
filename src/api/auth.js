import Axios from '@/plugins/axios'

const baseUrl = 'accounts'
const path = {
  token (user) {
    return Axios.post(`${baseUrl}/token`, {
      username: user.email,
      password: user.password
    })
  },
  getUser (userId) {
    return Axios.get(`${baseUrl}/${userId}/privacy`)
  }
}

export default path

import hash from 'object-hash'
// import _isObject from 'lodash.isobject'
// import _isEmpty from 'lodash.isempty'
// import { message } from '@/api/ant'
import handleError from '@/utils/handleError'
import classifyRestfulMethod from '@/utils/classifyRestfulMethod'
import messageJson from '@/api/ant/message.json'

export default {
  fetchMessages: ({ commit, state }) => {
    let apiQuery = {}
    if (state.apiCursor) {
      const queryString = state.apiCursor.split('?')[1]
      const query = decodeURIComponent(queryString)
      const queryList = query.split('&')
      queryList.forEach((queryUnit) => {
        const list = queryUnit.split('=')
        apiQuery[list[0]] = list[1]
      })
    }

    // return message.fetchMessages({ cursor: apiQuery.cursor })
    //   .then(response => {
    //     const { data } = response
    //     const { next, results } = data
    //     commit('SET_MESSAGE_API_CURSOR', next)
    //     commit('ADD_MESSAGE_BULK', results)
    //     return true
    //   })
    //   .catch(error => {
    //     return handleError(error)
    //   })

    return Promise.resolve(messageJson.results)
      .then(responses => {
        const results = responses.map(response => ({
          ...response,
          pk: hash(Math.random())
        }))
        commit('SET_MESSAGE_API_CURSOR', null)
        commit('ADD_MESSAGE_BULK', results)
        return true
      })
      .catch(error => {
        return handleError(error)
      })
  },
  updateMessage: async ({ commit, state }, payload) => {
    console.log('message actions.js')
    const { originData, updatedData } = payload
    // console.log(originData)
    // console.log(updatedData)
    const messageId = updatedData.pk || originData.pk
    const updatedDataList = classifyRestfulMethod(originData, updatedData)

    const flatData = []
    updatedDataList.forEach((datas, idx) => {
      datas.forEach((data, idx) => {
        flatData.push({
          ...data,
          messageId
        })
      })
    })
    // console.log(flatData)
    // commit('UPDATE_MESSAGE', updatedData)
    const intentList = []
    const entityList = []
    flatData.forEach(data => {
      if (data.key === 'intent') {
        intentList.push(data)
      } else if (data.key === 'entity') {
        entityList.push(data)
      }
    })

    const intentPostList = intentList
      .filter(intent => intent.method === 'post')
      .map(intent => intent)

    const intentPathcList = intentList
      .filter(intent => intent.method === 'patch')
      .map(intent => intent)

    const intentDeletecList = intentList
      .filter(intent => intent.method === 'delete')
      .map(intent => intent)

    const entityPostList = entityList
      .filter(intent => intent.method === 'post')
      .map(intent => intent)

    const entityPathcList = entityList
      .filter(intent => intent.method === 'patch')
      .map(intent => intent)

    const entityDeletecList = entityList
      .filter(intent => intent.method === 'delete')
      .map(intent => intent)

    console.log(intentPostList)
    console.log(intentPathcList)
    console.log(intentDeletecList)
    console.log(entityPostList)
    console.log(entityPathcList)
    console.log(entityDeletecList)
  }
}

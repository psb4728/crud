import axios from 'axios' // client에서 server로 데이터를 주고 받을수 있는 모듈

export default {
  methods: {
    async $api (url, data) {
      return (await axios({
        method: 'post',
        url,
        data
      }).catch(e => {
        console.log(e)
      })).data
    }
  }
}

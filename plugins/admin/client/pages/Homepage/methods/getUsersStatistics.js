import axios from 'axios'

export default function () {
  this.debug('getUsersStatistics')
  var options = {
    method: 'get',
    url: window.location.origin + '/api/users/queries/getUsersStatisticsQuery',
    responseType: 'json'
  }
  axios(options).then(response => {
    this.debug('getUsersStatistics response %o', response)
    this.stats = response.data.result
  }).catch(error => {
    this.debug('getUsersStatistics error %o', error)
    this.catchError(error.response)
  })
}

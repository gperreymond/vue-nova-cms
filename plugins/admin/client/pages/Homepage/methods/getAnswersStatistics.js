import axios from 'axios'

export default function () {
  this.debug('getAnswersStatistics')
  var options = {
    method: 'get',
    url: window.location.origin + '/api/answers/queries/getAnswersStatisticsQuery',
    responseType: 'json'
  }
  axios(options).then(response => {
    this.debug('getAnswersStatistics response %o', response)
    this.statsAnswers = response.data.result
  }).catch(error => {
    this.debug('getAnswersStatistics error %o', error)
    this.catchError(error.response)
  })
}

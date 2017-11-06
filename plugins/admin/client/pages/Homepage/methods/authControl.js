import axios from 'axios'

export default function () {
  this.debug('authControl')
  var options = {
    method: 'post',
    url: window.location.origin + '/admin/auth/control',
    responseType: 'json'
  }
  axios(options).then(response => {
    this.debug('authControl response %o', response)
    this.connected(response.data)
    this.currentState = 'STATE_COMPLETE'
  }).catch(error => {
    this.debug('authControl error %o', error)
    this.disconnected()
    this.catchError(error.response)
  })
}

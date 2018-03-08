import axios from 'axios'

export default function () {
  this.debug('authLogout')
  var options = {
    method: 'post',
    url: window.location.origin + '/admin/auth/logout',
    responseType: 'json'
  }
  axios(options).then(response => {
    this.debug('authLogout response %o', response)
    this.disconnected()
    window.location = window.location.origin + '/admin'
  }).catch(error => {
    this.debug('authLogout error %o', error)
    this.disconnected()
    this.catchError(error.response)
  })
}

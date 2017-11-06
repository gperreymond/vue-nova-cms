import axios from 'axios'

export default function () {
  this.debug('authControl')
  const BASE_URL = window.location.origin
  const url = `${BASE_URL}/admin/auth/control`
  axios.post(url).then(response => {
    this.user.connected = true
    this.currentState = 'STATE_COMPLETE'
  }).catch(error => {
    this.user.connected = false
    this.catchError(error.response)
  })
}

import axios from 'axios'

export default function () {
  console.log('authControl')
  const BASE_URL = window.location.origin
  const url = `${BASE_URL}/admin/auth/control`
  axios.get(url).then(response => {
    this.user.connected = true
    this.currentState = 'STATE_COMPLETE'
  }).catch(error => {
    this.user.connected = false
    this.currentState = 'STATE_COMPLETE'
    this.showError(error)
  })
}

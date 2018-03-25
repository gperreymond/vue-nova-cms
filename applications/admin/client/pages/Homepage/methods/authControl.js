import axios from 'axios'

export default async function () {
  try {
    this.debug('authControl')
    const options = {
      method: 'post',
      url: window.location.origin + '/admin/auth/control',
      responseType: 'json'
    }
    const response = await axios(options).catch(error => { throw error })
    this.debug('authControl response')
    this.connected(response.data)
    this.currentState = 'STATE_COMPLETE'
  } catch (e) {
    this.debug('authControl error %s', e.message)
    this.disconnected()
    this.catchError(e.response)
  }
}

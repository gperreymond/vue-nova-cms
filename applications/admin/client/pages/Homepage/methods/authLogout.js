import axios from 'axios'

export default async function () {
  try {
    this.debug('authLogout')
    var options = {
      method: 'post',
      url: window.location.origin + '/admin/auth/logout',
      responseType: 'json'
    }
    const response = await axios(options).catch(error => { throw error })
    this.debug('authLogout response %o', response)
    this.disconnected()
    window.location = window.location.origin + '/admin'
  } catch (e) {
    this.debug('authLogout error %o', e)
    this.disconnected()
    this.catchError(e.response)
  }
}

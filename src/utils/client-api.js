/**
 * Created by user on 24.05.16.
 */

// const isDEBUG = 'DEBUG' == 'DEBUG';

let config = {
  host: 'http://localhost:3000',
  phone: 'http://localhost:9000'
}

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default class API {

  static request (method, data) {

    let config = API.config ? API.config : config

    console.warn('API.request method deprecated! Use API.call instead.')

    function status (response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      }
      else {
        return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      return response.json()
    }

    if (typeof data == 'object') {
      data = JSON.stringify(data)
    }

    return fetch(config.host + '/' + method + '/', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'data=' + data
    })
      .then(status)
      .then(json)
      .catch(function (error) {
        console.log('Request failed', error)
      })

  }

  static call (method, data) {
    let config = API.config ? API.config : config

    function status (response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      }
      else {
        return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      return response.json()
    }

    let _body = ''
    if (typeof data == 'object') {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key]
          if (typeof value == 'object') {
            value = JSON.stringify(value)
          }
          _body += (_body.length ? '&' : '') + key + '=' + value
        }
      }
    }
    else {
      _body = data
    }

    return fetch(config.host + '/' + method + '/', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: _body
    })
      .then(status)
      .then(json)
      .catch(function (error) {
        console.log('Request failed', error)
      })
  }

  static filesUpload (method, files, bodyParams) {

    let config = API.config ? API.config : config

    if (!files) files = []

    if (typeof files.map !== 'function') {
      files = [files]
    }

    function status (response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      }
      else {
        return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      return response.json()
    }

    var data = new FormData()

    files.map((file) => {
      data.append('file', file)
    })

    if (typeof bodyParams === 'object') {
      Object.keys(bodyParams).forEach(key => {
        data.append(key, bodyParams[key])
      })
    }

    return fetch(config.host + '/' + method + '/', {
      method: 'post',
      body: data
    })
      .then(status)
      .then(json)
      .catch(function (error) {
        console.log('Request failed', error)
      })

  }

}

import RestClient from './RestClient'

export default class BaseService {
  request = (
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    options = {},
    headers = {}
  ) => {
    return RestClient[method](`${url}`, options, headers)
  }

  get(url: string, options = {}, headers = {}) {
    return this.request(url, 'get', options, headers)
  }

  post(url: string, options = {}, headers = {}) {
    return this.request(url, 'post', options, headers)
  }

  put(url: string, options = {}, headers = {}) {
    return this.request(url, 'put', options, headers)
  }

  del(url: string, headers = {}) {
    return this.request(url, 'delete', headers)
  }
}

import axios from 'axios'

const DEBUG = process.env.NODE_ENV === 'development'

const RestClient = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_NODE_ENV,
  timeout: 600000, // 10mins
})

const responseSuccessHandler = (response: any) => response

const responseErrorHandler = (error: any) => {
  if (DEBUG) {
    /* eslint-disable */
    if (error.response) {
      console.info(error.response.data)
      console.info(error.response.headers)
    } else if (error.request) {
      console.info(error.request)
    } else {
      console.info('Error', error.message)
    }
    console.info(error.config)
    /* eslint-enable */
  }

  return Promise.reject(error)
}

RestClient.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
)

export default RestClient

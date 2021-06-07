import axios from "axios"

/**
 *
 * @param {String} method //method for query -> GET,POST,PUT,DELETE
 * @param {String} pathUrl // path
 * @param {String} body //query command
 * @param {Boolean} isTestScript //Is use from test script?
 * @returns
 */
const fetchData = async (method, pathUrl, body) => {
  try {
    const PORT = process.env.REACT_APP_PORTBACKEND ? process.env.REACT_APP_PORTBACKEND : 8000
    const resp = await axios({
      url: `http://${window.location.hostname}:${PORT}/${pathUrl}`,
      data: body,
      method,
      headers: {
        // "Access-Control-Allow-Origin": "*",
      },
    })
    return resp
  } catch (error) {
    return error
  }
}
export default fetchData

import axios from "axios";

// import { getToken } from "../../storage/index";

import Cookies from "js-cookie";

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
    // const PORT = !isTestScript ? process.env.REACT_APP_PORTBACKEND : 8000;
    const resp = await axios({
      url: `http://${window.location.hostname}:${process.env.REACT_APP_PORTBACKEND}/${pathUrl}`,
      // url: `http://${window.location.hostname}:${PORT}/${pathUrl}`,
      data: body,
      method,

      headers: {
        //  "Access-Control-Allow-Origin": "*",
        //  'Access-Control-Allow-Headers': 'Set-Cookie'

       // Authorization: Cookies.get("tokenAccess"),
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
  
};
export default fetchData;

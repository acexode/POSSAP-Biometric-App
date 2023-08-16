import axios from "axios";
import getUrlString from "../../utils/get-url-string";
import { LOGIN } from "../../constants/api-routes";
import { computeCBSBody } from "../../utils/computeBody";

export const loginUrl = getUrlString(LOGIN);

import config from '../../config.json'
export default async function loginUser(data) {
  console.log(data);
  const body = computeCBSBody(
    "post",
    loginUrl,
    {},
    "",
    '',
    data
  );
  const configUrl = config.middlewareApi + '/fetch-data'
  const response = await axios.post(configUrl, body);

  // if (!response.ok) {
  //   throw new Error(`Error occurred while trying to login user`);
  // }

  return response;
}

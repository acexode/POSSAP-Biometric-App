import axios from "axios";
import getUrlString from "../../utils/get-url-string";
import { LOGIN } from "../../constants/api-routes";
import { computeCBSBody } from "../../utils/computeBody";
import config from '../../config.json';
export const loginUrl = getUrlString(LOGIN);

export default async function loginUser(data) {
  console.log(data);
  const body = computeCBSBody(
    "post",
    loginUrl,
    {},
    "",
    "",
    data
  );
  const configUrl = config.cbsRoute + "/fetch-data";
  const response = await axios.post(configUrl, body);
  console.log(response);
  if (response.data.data.Error) {
    throw new Error(response.data.data.ResponseObject);
  }

  return response;
}

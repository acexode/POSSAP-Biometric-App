import axios from "axios";
import getUrlString from "../../utils/get-url-string";
import { LOGIN } from "../../constants/api-routes";
import { computeCBSBody } from "../../utils/computeBody";

export default async function loginUser(data) {
  const url = getUrlString(LOGIN) + LOGIN;
  console.log(data);
  const body = computeCBSBody(
    "post",
    url,
    {},
    "",
    hashString,
    data
  );
  const response = await axios.post(url, body);

  // if (!response.ok) {
  //   throw new Error(`Error occurred while trying to login user`);
  // }

  return response;
}

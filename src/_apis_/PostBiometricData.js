import axios from "axios";
import getUrlString from "../utils/get-url-string";
import { computeCBSBody } from "../utils/computeBody";
import { POST_BIOMETRIC_DATA } from "../constants/api-routes";
import config from '../config.json';

export const url = getUrlString(POST_BIOMETRIC_DATA);

export default async function postBiometricData(data) {
  console.log(data);
  const body = computeCBSBody(
    "post",
    url,
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

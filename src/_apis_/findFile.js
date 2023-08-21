import axios from "axios";
import getUrlString from "../utils/get-url-string";
import { computeCBSBody } from "../utils/computeBody";
import { FIND_FILE } from "../constants/api-routes";
import config from '../config.json';

export const findFileUrl = getUrlString(FIND_FILE);

export default async function fetchFile(fileNumber) {
  console.log(fileNumber);
  const token = JSON.parse(localStorage.getItem('possap-user')).token
  const body = computeCBSBody(
    "get",
    findFileUrl + `${fileNumber}/${token}`,
    {},
    "",
    "",
    null
  );
  const configUrl = config.cbsRoute + "/fetch-data";
  const response = await axios.post(configUrl, body);
  console.log(response);
  if (response.data.data.Error) {
    throw new Error(response.data.data.ResponseObject);
  }

  return response;
}

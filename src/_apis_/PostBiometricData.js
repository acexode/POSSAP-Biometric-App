import axios from "axios";
import getUrlString from "../utils/get-url-string";
import { computeCBSBody } from "../utils/computeBody";
import { POST_PCC_BIOMETRIC442_DATA, POST_PCC_BIOMETRIC_DATA, POST_TINT_PERMIT_BIOMETRIC_DATA, POST_TINT_PERMIT_BIOMETRIC442_DATA } from "../constants/api-routes";
import config from '../config.json';

export const pccurl442 = getUrlString(POST_PCC_BIOMETRIC442_DATA);
export const pccurl = getUrlString(POST_PCC_BIOMETRIC_DATA);
export const tintUrl442 = getUrlString(POST_TINT_PERMIT_BIOMETRIC442_DATA);
export const tintUrl = getUrlString(POST_TINT_PERMIT_BIOMETRIC_DATA);

const  getFinalPath = (data, type) => {
  if(type === 'TGP'){
    return data.IsAmputee  ? tintUrl : tintUrl442
  }else{
    return data.IsAmputee  ? pccurl : pccurl442
  }
}


export default async function postBiometricData(data) {
  console.log(data);
  const finalUrl = getFinalPath(data, data.FileNumber.slice(0,3))
  const body = computeCBSBody(
    "post",
    finalUrl,
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

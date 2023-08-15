import axios from 'axios';
import getUrlString from '../../utils/get-url-string';
import { LOGIN } from '../../constants/api-routes';

export default async function loginUser(data) {
  const url = getUrlString(LOGIN);
  console.log(data);
  const response = await axios.post(url, data);

  // if (!response.ok) {
  //   throw new Error(`Error occurred while trying to login user`);
  // }

  return response;
}

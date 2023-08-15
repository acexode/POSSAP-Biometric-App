import config from '../config.json';
import getQueryString from './get-query-string';
import pathJoin from './path-join';
import toAbsolutePath from './to-absolute-path';

export default function getUrlString(path, queryParams = {}) {
  const baseURL = path.includes('http') ? path : pathJoin([config.ApiUrl, path], '/');
  const url = pathJoin([baseURL, getQueryString(queryParams)], '?');
  const absoluteUrl = toAbsolutePath(url);
  return absoluteUrl;
}

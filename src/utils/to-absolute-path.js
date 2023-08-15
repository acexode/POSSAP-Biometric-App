import pathJoin from './path-join';

const ABSOLUTE_URL_REGEX = /^(?:[a-z]+:)?\/\//;

export default function toAbsolutePath(baseUrl) {
  return ABSOLUTE_URL_REGEX.test(baseUrl) ? baseUrl : pathJoin([window.location.origin, baseUrl], '/');
}

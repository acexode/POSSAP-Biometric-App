export default function getQueryString(params = {}) {
  return Object.entries(params)
    .filter(([, value]) => isValueNotEmpty(value))
    .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(processQueryStringValue(value))])
    .map((entry) => entry.join('='))
    .join('&');
}

function processQueryStringValue(value) {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return value;
}

function isValueNotEmpty(value) {
  if (Array.isArray(value)) {
    return value.length !== 0;
  }
  return value != null;
}

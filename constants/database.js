const { URL_AUTH_API } = process.env;

export default function getAuthUrlByType(type) {
  return URL_AUTH_API.replace('{TYPE}', type);
}

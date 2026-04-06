export function getAppBaseUrl(requestUrl?: string) {
  const configured =
    process.env.NEXTAUTH_URL ||
    process.env.AUTH_URL ||
    process.env.APP_URL;

  if (configured) {
    return configured;
  }

  if (requestUrl) {
    return new URL(requestUrl).origin;
  }

  return "http://localhost:3000";
}

export function getAppUrl(pathname: string, requestUrl?: string) {
  return new URL(pathname, getAppBaseUrl(requestUrl));
}
